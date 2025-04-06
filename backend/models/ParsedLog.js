import mongoose from 'mongoose';

const parsedLogSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.model('ParsedLog', parsedLogSchema);
