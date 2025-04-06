import mongoose from 'mongoose';

const latencyMatrixSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.model('LatencyMatrix', latencyMatrixSchema);
