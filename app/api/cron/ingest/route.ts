import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Verify cron secret
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  console.log("[cron/ingest] starting opportunity ingestion");
  const start = Date.now();

  // TODO: Phase 2 — implement scrapers for each data source
  // For now, return success to confirm cron is working
  console.log(`[cron/ingest] completed in ${Date.now() - start}ms`);
  return NextResponse.json({ status: "ok", message: "Ingestion placeholder — scrapers coming in Phase 2" });
}
