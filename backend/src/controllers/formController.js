import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Define schema for form submissions
const submissionSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  number: { 
    type: String, 
    required: true, 
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  whatsapp: { 
    type: String, 
    required: false, 
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit WhatsApp number']
  },
  service: { type: String, required: true, trim: true },
  timestamp: { type: Date, default: Date.now }
});

// Create model
const Submission = mongoose.model('Submission', submissionSchema);

// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const submitForm = async (req, res) => {
  try {
    const { firstName, lastName, email, number, whatsapp, service } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !number || !service) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create new submission
    const submission = new Submission({
      firstName,
      lastName,
      email,
      number,
      whatsapp,
      service
    });

    // Validate the submission
    const validationError = submission.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    // Save to MongoDB
    await submission.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${number}
        WhatsApp: ${whatsapp || 'Not provided'}
        Service: ${service}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate submission detected' });
    }
    
    res.status(500).json({ error: 'Failed to submit form' });
  }
}; 