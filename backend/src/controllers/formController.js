import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// In-memory storage for form submissions
const submissions = [];

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

    // Store submission in memory
    const submission = {
      firstName,
      lastName,
      email,
      number,
      whatsapp,
      service,
      timestamp: new Date()
    };
    submissions.push(submission);

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'New Contact Form Submission',
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${number}
        WhatsApp: ${whatsapp}
        Service: ${service}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
}; 