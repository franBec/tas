// Based of https://github.com/adityasinghcodes/nextjs-monitoring/blob/main/instrumentation.ts
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
    const { registerOTel } = await import("@vercel/otel");

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
        host: process.env.LOKI_HOST || "http://localhost:3100",
        batching: true,
        interval: 5,
        labels: {
          app: process.env.OTEL_SERVICE_NAME || "next-app",
          environment: process.env.NODE_ENV || "development",
        },
      })
    );

    //otel initialization
    registerOTel();
  }
}
