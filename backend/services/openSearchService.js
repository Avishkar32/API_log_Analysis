const axios = require("axios");

async function fetchLogsFromOpenSearch() {
  const res = await axios.post(`http://localhost:51594/otel/_search`, {
    query: {
      range: {
        "@timestamp": {
          gte: "now-5m",
          lte: "now"
        }
      }
    },
    size: 5
  });

  return res.data.hits.hits;
}

module.exports = { fetchLogsFromOpenSearch };
