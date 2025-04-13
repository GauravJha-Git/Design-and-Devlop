import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  number: { type: String, required: true },
  watsNumber: { type: String },
  service: { type: String, required: true },
  comments: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

export default Form;
