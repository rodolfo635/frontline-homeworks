import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure email service
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Send welcome email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@frontlinehomeworks.com',
      to: email,
      subject: 'Welcome to FRONTLINE Homeworks!',
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for joining FRONTLINE Homeworks.</p>
        <p>Your account has been created successfully.</p>
        <p>You can now browse our products and make purchases.</p>
        <br/>
        <p>Best regards,<br/>FRONTLINE Homeworks Team</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

// Send contact form response email
export const sendContactResponseEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@frontlinehomeworks.com',
      to: email,
      subject: 'We Received Your Message - FRONTLINE Homeworks',
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Our team typically responds within 24-48 hours.</p>
        <br/>
        <p>Best regards,<br/>FRONTLINE Homeworks Support Team</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Contact response email sent to ${email}`);
  } catch (error) {
    console.error('Error sending contact email:', error);
  }
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (email, name, orderId, amount) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@frontlinehomeworks.com',
      to: email,
      subject: `Order Confirmation #${orderId} - FRONTLINE Homeworks`,
      html: `
        <h2>Order Confirmed!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr style="border: 1px solid #ddd; padding: 8px;">
            <td style="padding: 8px;"><strong>Order ID:</strong></td>
            <td style="padding: 8px;">#${orderId}</td>
          </tr>
          <tr style="border: 1px solid #ddd; padding: 8px;">
            <td style="padding: 8px;"><strong>Amount:</strong></td>
            <td style="padding: 8px;">$${amount.toFixed(2)}</td>
          </tr>
          <tr style="border: 1px solid #ddd; padding: 8px;">
            <td style="padding: 8px;"><strong>Status:</strong></td>
            <td style="padding: 8px;">Processing</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">We will update you on the shipping status soon.</p>
        <br/>
        <p>Best regards,<br/>FRONTLINE Homeworks Team</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending order email:', error);
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@frontlinehomeworks.com',
      to: email,
      subject: 'Password Reset - FRONTLINE Homeworks',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password.</p>
        <p><a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <br/>
        <p>Best regards,<br/>FRONTLINE Homeworks Team</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};
