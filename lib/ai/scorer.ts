import { generateText, Output } from "ai";
import { z } from "zod";

// ─── Match Result Schema ─────────────────────────────────────────
export const MatchResultSchema = z.object({
  eligibility: z.object({
    score: z.number().min(0).max(100),
    metCriteria: z.array(z.string()),
    unmetCriteria: z.array(z.string()),
    reasoning: z.string(),
  }),
  relevance: z.object({
    score: z.number().min(0).max(100),
    alignmentFactors: z.array(z.string()),
    gaps: z.array(z.string()),
    reasoning: z.string(),
  }),
  competitiveness: z.object({
    score: z.number().min(0).max(100),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    reasoning: z.string(),
  }),
  combinedScore: z.number().min(0).max(100),
  recommendation: z.enum([
    "strong_match",
    "good_match",
    "possible_match",
    "unlikely_match",
    "not_eligible",
  ]),
  summary: z.string(),
  nextSteps: z.array(z.string()),
});

export type MatchResult = z.infer<typeof MatchResultSchema>;

// ─── Score a Company-Opportunity Pair ────────────────────────────
export async function scoreMatch(
  companyProfile: Record<string, unknown>,
  opportunity: Record<string, unknown>
): Promise<MatchResult> {
  console.log(
    `[scorer] Scoring ${companyProfile.name} vs ${opportunity.title}`
  );

  const { output } = await generateText({
    model: "anthropic/claude-sonnet-4.6",
    output: Output.object({ schema: MatchResultSchema }),
    prompt: `You are an expert business consultant specializing in grant eligibility, government procurement, and business development financing in the MENA region.

Analyze the compatibility between this company and this opportunity. Produce three scores with detailed reasoning.

## COMPANY PROFILE
${JSON.stringify(companyProfile, null, 2)}

## OPPORTUNITY
${JSON.stringify(opportunity, null, 2)}

## SCORING INSTRUCTIONS

**Eligibility Score (0-100)**: Can this company legally apply?
- Check: location requirements, company size, sector eligibility, ownership requirements, age requirements, documentation readiness
- Below 40 = "not_eligible"
- Each unmet hard criterion reduces score by 15-25 points

**Relevance Score (0-100)**: How well does this opportunity align with what the company actually does?
- Check: sector overlap, capability match, geographic market alignment, business model fit
- Consider both direct relevance and adjacent applicability

**Competitiveness Score (0-100)**: How likely is this company to succeed if they apply?
- Check: company strengths vs opportunity requirements, track record, scale appropriateness, certification/documentation readiness
- Factor in typical competition level for this type of opportunity

**Combined Score** = (Eligibility x 0.4) + (Relevance x 0.4) + (Competitiveness x 0.2)

**Recommendation thresholds**:
- 80-100: "strong_match"
- 65-79: "good_match"
- 50-64: "possible_match"
- 30-49: "unlikely_match"
- 0-29: "not_eligible"

**Next Steps**: Provide 2-4 specific, actionable steps the company should take if pursuing this opportunity.

Be precise and honest. Do not inflate scores.`,
  });

  if (!output) {
    throw new Error("AI scoring returned no output");
  }

  console.log(
    `[scorer] Score: ${output.combinedScore}/100 (${output.recommendation})`
  );
  return output;
}
