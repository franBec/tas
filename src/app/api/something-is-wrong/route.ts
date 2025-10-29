// Based of https://github.com/adityasinghcodes/nextjs-monitoring/blob/main/app/api/examples/logging/route.ts
export const runtime = "nodejs";

export async function GET() {
  try {
    throw new Error("Something is fundamentally wrong with this API endpoint");
  } catch (error) {
    globalThis?.logger?.error({
      err: error,
      message: "An error message here",
    });
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
