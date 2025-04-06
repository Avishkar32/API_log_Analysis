const axios = require("axios");

async function analyzeLogs(parsedLogs) {
  const logsAsText = parsedLogs
    .map(
      (log, i) =>
        `Log ${i + 1}: URL=${log.urlPath}, Status=${log.statusCode}, Time=${log.responseTime}ms, Trace=${log.traceId}`
    )
    .join("\n");

  const res = await axios.post("http://localhost:5000/api/chat", {
    sessionId: "log-analysis-session",
    message: "Please analyze the following API logs and find anomalies.",
    logs: [logsAsText],
  });

  return res.data.reply;
}

module.exports = { analyzeLogs };
