function parseLog(entry) {
    const src = entry._source || {};
    const attrs = src.attributes || {};
    const res = src.resource || {};
    const body = typeof src.body === "string" ? src.body : "";

    const result = {
        '@timestamp': src["@timestamp"] || "",
        'observed_timestamp': src.observedTimestamp || "",
        'service.name': res["service.name"] || "",

        'http.method': null,
        'http.path': null,
        'http.status_code': null,
        'http.version': null,
        'http.response_size_bytes': null,

        'response_time_ms': null,
        'latency_ms': null,
        'upstream_time_ms': null,

        'source.address': attrs["source.address"] || "",
        'destination.address': attrs["destination.address"] || "",
        'server.address': attrs["server.address"] || "",
        'upstream.cluster': attrs["upstream.cluster"] || "",
        'upstream.host': attrs["upstream.host"] || "",

        'url.full': attrs["url.full"] || "",
        'url.path': attrs["url.path"] || "",
        'url.query': attrs["url.query"] || "",

        'user_agent.original': attrs["user_agent.original"] || "",

        'trace.id': src.traceId || "",
        'span.id': src.spanId || "",

        'raw.body': body,
        'log_type': 'proxy'
    };

    const envoyLogRegex = /\[[^\]]+]\s+"(\w+)\s+([^\s]+)\s+HTTP\/([\d.]+)"\s+(\d{3})(?:\s+[^\s"]+){0,5}\s+"[^"]*"\s+(\d+)\s+(\d+)/;
    const match = body.match(envoyLogRegex);

    if (match) {
        result['http.method'] = match[1];
        result['http.path'] = match[2];
        result['http.version'] = match[3];
        result['http.status_code'] = parseInt(match[4], 10);
        result['http.response_size_bytes'] = match[5] === '-' ? 0 : parseInt(match[5], 10);
        result['latency_ms'] = parseInt(match[6], 10);
        result['response_time_ms'] = parseInt(match[7], 10);
        result['upstream_time_ms'] = result['response_time_ms'] - result['latency_ms'];
    }

    if (result['http.path']) {
        const cleanPath = result['http.path'].split('?')[0];
        if (cleanPath && cleanPath !== result['url.path']) {
            result['url.clean_path'] = cleanPath;
        }
    }

    const numericFields = [
        'http.status_code',
        'http.response_size_bytes',
        'response_time_ms',
        'latency_ms',
        'upstream_time_ms'
    ];

    numericFields.forEach(field => {
        if (result[field] !== null && !isNaN(result[field])) {
            result[field] = Number(result[field]);
        } else {
            result[field] = null;
        }
    });

    return result;
}


function processLogsAndReturnArrays(logs) {
    const parsedLogs = [];
    const latencyMetrics = [];
    const errorMetrics = [];
    const spanMetrics = [];

    for (const entry of logs) {
        const parsed = parseLog(entry);
        parsedLogs.push(parsed);

        const traceId = parsed['trace.id'];
        const spanId = parsed['span.id'];
        const service = parsed['service.name'];
        const latency = parsed['latency_ms'];
        const status = parsed['http.status_code'];

        // Latency
        if (latency !== null && traceId && service) {
            latencyMetrics.push({
                traceId,
                service,
                latency_ms: latency
            });
        }

        // Error
        if (traceId && status !== null && service) {
            errorMetrics.push({
                traceId,
                service,
                statusCode: status,
                isError: status >= 500 || status === 0
            });
        }

        // Span
        if (traceId && spanId) {
            spanMetrics.push({
                traceId,
                spanId,
                service,
                startTime: parsed['@timestamp'],
                endTime: parsed['observed_timestamp'],
                latency_ms: latency
            });
        }
    }

    console.log("🔍 Parsed Logs:", parsedLogs);
    console.log("⏱️ Latency Metrics:", latencyMetrics);
    console.log("❌ Error Metrics:", errorMetrics);
    console.log("🧵 Span Metrics:", spanMetrics);

    return [parsedLogs, latencyMetrics, errorMetrics, spanMetrics];
}



module.exports = { parseLog, processLogsAndReturnArrays };
