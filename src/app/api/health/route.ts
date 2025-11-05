export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    monitoring: {
      metricsRegistry: !!globalThis?.metrics?.registry,
      logger: !!globalThis?.logger,
    },
    env: {
      otelLogLevel: process.env.OTEL_LOG_LEVEL,
      otelServiceName: process.env.OTEL_SERVICE_NAME,
      otelExporterOtlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
      lokiHost: process.env.LOKI_HOST,
      nodeEnv: process.env.NODE_ENV,
    },
  });
}
