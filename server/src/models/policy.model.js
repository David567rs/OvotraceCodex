import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Policy', policySchema);
