import nodemailer from 'nodemailer';

export const submitForm = async (req, res) => {
  try {
    const { firstName, lastName, email, number, watsNumber, service, comments } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      text: `
        First Name: ${firstName}
        Last Name: ${lastName || 'Not provided'}
        Email: ${email}
        Phone Number: ${number}
        WhatsApp Number: ${watsNumber || 'Not provided'}
        Service: ${service}
        Comments: ${comments || 'Not provided'}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
}; 