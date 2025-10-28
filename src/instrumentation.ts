// Based of https://github.com/adityasinghcodes/nextjs-monitoring/blob/main/instrumentation.ts
// Node.js-specific imports are moved into dynamic imports within runtime checks
// Prevent Edge runtime from trying to import Node.js-specific modules
declare global {
  var metrics:
    | {
        registry: any;
      }
    | undefined;
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Registry, collectDefaultMetrics } = await import("prom-client");

    //prometheus initialization
    const prometheusRegistry = new Registry();
    collectDefaultMetrics({
      register: prometheusRegistry,
    });
    globalThis.metrics = {
      registry: prometheusRegistry,
    };
  }
}
