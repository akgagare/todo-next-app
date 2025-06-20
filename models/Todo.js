
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
