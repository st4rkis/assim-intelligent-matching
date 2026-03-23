import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { opportunities } from "@/lib/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { eq, desc, and, gte, sql } from "drizzle-orm";

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status") ?? "open";
  const country = url.searchParams.get("country");
  const type = url.searchParams.get("type");
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "20"), 50);
  const cursor = url.searchParams.get("cursor");

  const db = getDb();

  const conditions = [eq(opportunities.status, status)];
  if (country) conditions.push(eq(opportunities.sourceCountry, country));
  if (type) conditions.push(eq(opportunities.type, type));
  if (cursor) conditions.push(sql`${opportunities.id} > ${cursor}`);

  const results = await db
    .select()
    .from(opportunities)
    .where(and(...conditions))
    .orderBy(desc(opportunities.deadline))
    .limit(limit + 1);

  const hasMore = results.length > limit;
  const data = hasMore ? results.slice(0, limit) : results;

  return NextResponse.json({
    data,
    pagination: {
      next_cursor: hasMore ? data[data.length - 1].id : null,
      has_more: hasMore,
    },
  });
}
