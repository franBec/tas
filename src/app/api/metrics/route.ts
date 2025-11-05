import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!globalThis?.metrics?.registry) {
      return new NextResponse("Metrics Unavailable", {
        status: 503,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const metrics = await globalThis.metrics.registry.metrics();
    return new NextResponse(metrics, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error collecting metrics:", error);
    return new NextResponse("Error collecting metrics", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
