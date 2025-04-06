const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  timestamp: String,
  urlPath: String,
  statusCode: String,
  responseTime: Number,
  traceId: String,
  upstream: String,
  source: String,
  destination: String,
  genaiAnalysis: String
});

module.exports = mongoose.model("Log", LogSchema);
