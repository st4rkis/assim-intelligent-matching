import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { companies } from "@/lib/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { profileCompany } from "@/lib/ai/profiler";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  console.log("[api/profile] incoming POST");
  const start = Date.now();

  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { website_url } = await req.json();
    if (!website_url) {
      return NextResponse.json(
        { error: "website_url is required" },
        { status: 400 }
      );
    }

    // Run AI profiling
    const profile = await profileCompany(website_url);
    const db = getDb();

    // Insert company profile
    const inserted = await db
      .insert(companies)
      .values({
        userId: user.sub,
        externalUserId: user.ext,
        name: profile.name,
        websiteUrl: website_url,
        description: profile.description,
        primarySector: profile.primarySector,
        secondarySectors: profile.secondarySectors,
        isicCodes: profile.isicCodes,
        country: profile.country,
        city: profile.city,
        operatingCountries: profile.operatingCountries,
        targetMarkets: profile.targetMarkets,
        sizeCategory: profile.sizeCategory,
        employeeRange: profile.employeeRange,
        yearsInOperation: profile.yearsInOperation,
        ownershipType: profile.ownershipType,
        capabilities: profile.capabilities,
        productsServices: profile.productsServices,
        certifications: profile.certifications,
        technologyStack: profile.technologyStack,
        aiSummary: profile.aiSummary,
        confidenceScores: profile.confidenceScores,
        lastProfiledAt: new Date(),
      })
      .returning();

    console.log(
      `[api/profile] created profile ${inserted[0].id} in ${Date.now() - start}ms`
    );
    return NextResponse.json({
      profile_id: inserted[0].id,
      profile: inserted[0],
    });
  } catch (error) {
    console.error("[api/profile] failed", {
      error: String(error),
      ms: Date.now() - start,
    });
    return NextResponse.json({ error: "Profiling failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const results = await db
    .select()
    .from(companies)
    .where(eq(companies.userId, user.sub));

  return NextResponse.json({ companies: results });
}
