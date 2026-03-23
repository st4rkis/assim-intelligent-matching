import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { matches, companies, opportunities } from "@/lib/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { eq, desc, and, sql } from "drizzle-orm";

export async function GET(req: Request) {
  console.log("[api/matches] incoming GET");
  const start = Date.now();

  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "20"), 50);
    const cursor = url.searchParams.get("cursor");
    const minScore = parseInt(url.searchParams.get("min_score") ?? "0");

    const db = getDb();

    // Get user's company IDs
    const userCompanies = await db
      .select({ id: companies.id })
      .from(companies)
      .where(eq(companies.userId, user.sub));

    if (userCompanies.length === 0) {
      return NextResponse.json({ data: [], pagination: { next_cursor: null, has_more: false } });
    }

    const companyIds = userCompanies.map((c) => c.id);

    const conditions = [
      sql`${matches.companyId} = ANY(${companyIds})`,
      sql`${matches.combinedScore} >= ${minScore}`,
    ];
    if (cursor) conditions.push(sql`${matches.id} > ${cursor}`);

    const results = await db
      .select({
        match: matches,
        opportunity: opportunities,
        company: companies,
      })
      .from(matches)
      .innerJoin(opportunities, eq(matches.opportunityId, opportunities.id))
      .innerJoin(companies, eq(matches.companyId, companies.id))
      .where(and(...conditions))
      .orderBy(desc(matches.combinedScore))
      .limit(limit + 1);

    const hasMore = results.length > limit;
    const data = hasMore ? results.slice(0, limit) : results;

    console.log(`[api/matches] returned ${data.length} matches in ${Date.now() - start}ms`);
    return NextResponse.json({
      data,
      pagination: {
        next_cursor: hasMore ? data[data.length - 1].match.id : null,
        has_more: hasMore,
      },
    });
  } catch (error) {
    console.error("[api/matches] failed", { error: String(error), ms: Date.now() - start });
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
