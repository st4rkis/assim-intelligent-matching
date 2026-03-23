import { generateText, Output } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";

// ─── Company Profile Schema (AI output) ──────────────────────────
export const CompanyProfileSchema = z.object({
  name: z.string().describe("Company name"),
  description: z
    .string()
    .describe("2-3 sentence description of what the company does"),
  primarySector: z
    .string()
    .describe("Primary industry sector (e.g., Hospitality & Tourism)"),
  secondarySectors: z.array(z.string()).describe("Secondary sectors"),
  isicCodes: z.array(z.string()).describe("ISIC industry classification codes"),
  country: z
    .string()
    .describe("ISO 3166-1 alpha-2 country code where company is based"),
  city: z.string().describe("City where company headquarters is located"),
  operatingCountries: z
    .array(z.string())
    .describe("Countries where the company operates"),
  targetMarkets: z
    .array(z.string())
    .describe("Target market regions (e.g., GCC, MENA, EU)"),
  sizeCategory: z
    .enum(["micro", "sme", "mid_market", "large"])
    .describe("Company size category"),
  employeeRange: z
    .string()
    .describe("Estimated employee range (e.g., 51-200)"),
  yearsInOperation: z
    .number()
    .nullable()
    .describe("Estimated years the company has been operating"),
  ownershipType: z
    .enum(["independent", "franchise", "subsidiary", "joint_venture"])
    .describe("Ownership structure"),
  capabilities: z
    .array(z.string())
    .describe("List of key business capabilities"),
  productsServices: z
    .array(z.string())
    .describe("Specific products or services offered"),
  certifications: z.array(z.string()).describe("Known certifications"),
  technologyStack: z
    .array(z.string())
    .describe("Technology platforms or tools used"),
  aiSummary: z
    .string()
    .describe(
      "3-sentence executive summary suitable for a business directory"
    ),
  confidenceScores: z
    .object({
      sector: z.number().min(0).max(1),
      size: z.number().min(0).max(1),
      capabilities: z.number().min(0).max(1),
      years: z.number().min(0).max(1),
      geography: z.number().min(0).max(1),
    })
    .describe("Confidence level 0-1 for each extracted field category"),
});

export type CompanyProfileOutput = z.infer<typeof CompanyProfileSchema>;

// ─── Website Scraper ─────────────────────────────────────────────
const SUBPAGES = ["/about", "/services", "/products", "/about-us", "/company"];

async function scrapeWebsite(url: string): Promise<string> {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
  const texts: string[] = [];

  // Fetch homepage
  try {
    const res = await fetch(normalizedUrl, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "AssIM-Bot/1.0 (opportunity-matcher)" },
    });
    if (res.ok) {
      const html = await res.text();
      texts.push(extractText(html, normalizedUrl));
    }
  } catch {
    // Homepage fetch failed, continue with subpages
  }

  // Try common subpages
  for (const subpage of SUBPAGES) {
    try {
      const subUrl = new URL(subpage, normalizedUrl).toString();
      const res = await fetch(subUrl, {
        signal: AbortSignal.timeout(8000),
        headers: { "User-Agent": "AssIM-Bot/1.0 (opportunity-matcher)" },
      });
      if (res.ok) {
        const html = await res.text();
        texts.push(extractText(html, subUrl));
      }
    } catch {
      // Subpage not found or timeout, skip
    }
  }

  if (texts.length === 0) {
    throw new Error(`Could not fetch any content from ${normalizedUrl}`);
  }

  // Combine and truncate to avoid token limits
  return texts.join("\n\n---\n\n").slice(0, 15000);
}

function extractText(html: string, url: string): string {
  const $ = cheerio.load(html);

  // Remove noise
  $("script, style, nav, footer, header, iframe, noscript").remove();

  // Extract meta info
  const title = $("title").text().trim();
  const metaDesc =
    $('meta[name="description"]').attr("content")?.trim() ?? "";
  const ogDesc =
    $('meta[property="og:description"]').attr("content")?.trim() ?? "";

  // Extract main body text
  const bodyText = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 5000);

  return `URL: ${url}\nTitle: ${title}\nMeta: ${metaDesc}\nOG: ${ogDesc}\n\n${bodyText}`;
}

// ─── AI Profile Generator ────────────────────────────────────────
export async function profileCompany(
  websiteUrl: string
): Promise<CompanyProfileOutput> {
  console.log(`[profiler] Starting profile for ${websiteUrl}`);

  const websiteContent = await scrapeWebsite(websiteUrl);
  console.log(
    `[profiler] Scraped ${websiteContent.length} chars from ${websiteUrl}`
  );

  const { output } = await generateText({
    model: "anthropic/claude-sonnet-4.6",
    output: Output.object({ schema: CompanyProfileSchema }),
    prompt: `You are an expert business analyst. Analyze the following website content and extract a structured company profile.

Be thorough but honest — if information is not clearly available on the website, use your best judgment and set a low confidence score for that field. Do not fabricate specific details that aren't evidenced in the content.

For ISIC codes, use the International Standard Industrial Classification of All Economic Activities codes that best match the company's primary activities.

Website content:
${websiteContent}

Extract the company profile with all fields. For confidence scores:
- 0.9-1.0: Clearly stated on the website
- 0.6-0.8: Reasonably inferred from context
- 0.3-0.5: Educated guess based on limited info
- 0.0-0.2: Very uncertain, minimal evidence`,
  });

  if (!output) {
    throw new Error("AI profiling returned no output");
  }

  console.log(
    `[profiler] Profile generated for ${output.name} (${output.primarySector})`
  );
  return output;
}
