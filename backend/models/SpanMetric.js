import mongoose from 'mongoose';

const spanMetricSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.model('SpanMetric', spanMetricSchema);
