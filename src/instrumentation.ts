// Based of https://github.com/adityasinghcodes/nextjs-monitoring/blob/main/instrumentation.ts
// Node.js-specific imports are moved into dynamic imports within runtime checks
// Prevent Edge runtime from trying to import Node.js-specific modules
declare global {
  var metrics:
    | {
        registry: any;
      }
    | undefined;
  var logger: any | undefined;
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Registry, collectDefaultMetrics } = await import("prom-client");
    const pino = (await import("pino")).default;
    const pinoLoki = (await import("pino-loki")).default;

    //prometheus initialization
    const prometheusRegistry = new Registry();
    collectDefaultMetrics({
      register: prometheusRegistry,
    });
    globalThis.metrics = {
      registry: prometheusRegistry,
    };

    //loki initialization
    globalThis.logger = pino(
      pinoLoki({
        host: "http://localhost:3100", // Connects to the loki container via localhost:3100
        batching: true,
        interval: 5,
        labels: { app: "next-app" }, // Crucial label for querying in Grafana
      })
    );
  }
}
