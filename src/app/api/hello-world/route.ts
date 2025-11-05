export const runtime = "nodejs";

export async function GET() {
  try {
    const { randomUUID } = await import("crypto");

    globalThis?.logger?.info({
      meta: {
        requestId: randomUUID(),
        extra: "This is some extra information that you can add to the meta",
        anything: "anything",
      },
      message: "Successful request handled",
    });
    return Response.json({
      message: "Hello world",
    });
  } catch (error) {
    globalThis?.logger?.error({
      err: error,
      message: "Something went wrong during success logging",
    });
  }
}
