'use strict';

const process = require('process');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

class LoggingOTLPTraceExporter extends OTLPTraceExporter {
  export(spans, resultCallback) {
    console.log(`[Exporter] กำลังส่ง ${spans.length} spans ไปยัง Datadog OTLP endpoint...`);

    super.export(spans, (result) => {
      if (result.error) {
        console.error('[Exporter] เกิดข้อผิดพลาดในการส่ง:', result.error);
      } else {
        console.log('[Exporter] ส่งข้อมูลสำเร็จ ✅');
      }
      resultCallback(result);
    });
  }
}

const exporter = new LoggingOTLPTraceExporter({
  url: 'https://trace.agent.datadoghq.com/api/v0.2/traces',  // เปลี่ยนเป็น endpoint ของคุณถ้าจำเป็น
  headers: {
    'dd-api-key': '9abb156d02a0b2d2a8a67d9d61aa06bd', //datadog api key
    'dd-protocol': 'otlp',
    'dd-otlp-source': 'datadog', // หรือใช้ชื่อแอปหรือ team
  },
});

const sdk = new NodeSDK({
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

(async () => {
  try {
    await sdk.start();
    console.log('Tracing initialized');
  } catch (err) {
    console.error('Error initializing tracing', err);
  }
})();

process.on('SIGTERM', async () => {
  try {
    await sdk.shutdown();
    console.log('Tracing terminated');
  } catch (err) {
    console.error('Error terminating tracing', err);
  } finally {
    process.exit(0);
  }
});
