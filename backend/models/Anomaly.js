const mongoose = require('mongoose');

const anomalySchema = new mongoose.Schema({
  stringAnalysis: {
    type: String,
    required: true
  },
  stringErrors: {
    type: [String], // Assuming string errors are stored in an array of strings
    required: true
  },
  stringRootCause: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Optionally add timestamps to track creation and updates
});

const Anomaly = mongoose.model('Anomaly', anomalySchema);

module.exports = Anomaly;
