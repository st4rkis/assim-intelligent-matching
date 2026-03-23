import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { matches, companies, opportunities } from "@/lib/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { scoreMatch } from "@/lib/ai/scorer";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  console.log("[api/matches/score] incoming POST");
  const start = Date.now();

  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { company_id, opportunity_id } = await req.json();
    if (!company_id || !opportunity_id) {
      return NextResponse.json(
        { error: "company_id and opportunity_id are required" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Verify company belongs to user
    const company = await db
      .select()
      .from(companies)
      .where(eq(companies.id, company_id))
      .limit(1);

    if (company.length === 0 || company[0].userId !== user.sub) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Get opportunity
    const opp = await db
      .select()
      .from(opportunities)
      .where(eq(opportunities.id, opportunity_id))
      .limit(1);

    if (opp.length === 0) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
    }

    // Score the match
    const result = await scoreMatch(
      company[0] as unknown as Record<string, unknown>,
      opp[0] as unknown as Record<string, unknown>
    );

    // Upsert match result
    const upserted = await db
      .insert(matches)
      .values({
        companyId: company_id,
        opportunityId: opportunity_id,
        eligibilityScore: result.eligibility.score,
        relevanceScore: result.relevance.score,
        competitivenessScore: result.competitiveness.score,
        combinedScore: result.combinedScore,
        recommendation: result.recommendation,
        eligibilityDetail: result.eligibility,
        relevanceDetail: result.relevance,
        competitivenessDetail: result.competitiveness,
        summary: result.summary,
        nextSteps: result.nextSteps,
        modelVersion: "claude-sonnet-4.6",
      })
      .onConflictDoUpdate({
        target: [matches.companyId, matches.opportunityId],
        set: {
          eligibilityScore: result.eligibility.score,
          relevanceScore: result.relevance.score,
          competitivenessScore: result.competitiveness.score,
          combinedScore: result.combinedScore,
          recommendation: result.recommendation,
          eligibilityDetail: result.eligibility,
          relevanceDetail: result.relevance,
          competitivenessDetail: result.competitiveness,
          summary: result.summary,
          nextSteps: result.nextSteps,
          scoredAt: new Date(),
          modelVersion: "claude-sonnet-4.6",
        },
      })
      .returning();

    console.log(
      `[api/matches/score] scored ${result.combinedScore}/100 in ${Date.now() - start}ms`
    );
    return NextResponse.json({ match: upserted[0], result });
  } catch (error) {
    console.error("[api/matches/score] failed", {
      error: String(error),
      ms: Date.now() - start,
    });
    return NextResponse.json({ error: "Scoring failed" }, { status: 500 });
  }
}
