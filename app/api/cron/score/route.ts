import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  console.log("[cron/score] starting batch scoring");
  const start = Date.now();

  // TODO: Phase 2 — find new opportunities and score against all companies
  console.log(`[cron/score] completed in ${Date.now() - start}ms`);
  return NextResponse.json({ status: "ok", message: "Scoring placeholder — batch scoring coming in Phase 2" });
}
