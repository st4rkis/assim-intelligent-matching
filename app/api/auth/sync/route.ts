import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { signToken } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  console.log("[api/auth/sync] incoming request");

  try {
    const { email, name, external_id } = await req.json();

    if (!email || !external_id) {
      return NextResponse.json(
        { error: "email and external_id are required" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Upsert user — idempotent
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.externalId, external_id))
      .limit(1);

    let user;
    if (existing.length > 0) {
      user = existing[0];
    } else {
      const inserted = await db
        .insert(users)
        .values({ email, name, externalId: external_id })
        .returning();
      user = inserted[0];
    }

    const token = await signToken({
      userId: user.id,
      externalId: external_id,
      email: user.email,
      plan: user.plan ?? "free",
    });

    console.log(`[api/auth/sync] synced user ${user.id}`);
    return NextResponse.json({ user_id: user.id, jwt_token: token });
  } catch (error) {
    console.error("[api/auth/sync] failed", { error: String(error) });
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
