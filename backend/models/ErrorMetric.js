const mongoose = require('mongoose');

const errorMetricSchema = new mongoose.Schema({
  service: String,
  errorType: String,
  count: Number,
  timestamp: Date,
});

const ErrorMetric = mongoose.model('ErrorMetric', errorMetricSchema);

module.exports = ErrorMetric;
