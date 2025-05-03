import { OTPModel } from '../models/OTPModel.js';
import { User } from '../models/user.model.js';  // Assuming you have a User model
import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config(); // Load env variables

const generateAndSendOtp = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Check if the email is already registered
    const user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({ message: 'Email is already registered' });  // Conflict status code
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date().getTime() + 5 * 60 * 1000;

    // Save OTP to the database
    await OTPModel.create({ email, otp, expiresAt });

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Your OTP for Registration',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333;">👋 Hello,</h2>
        <p style="font-size: 16px; color: #555;">
          Thank you for signing up! To complete your registration, please use the following One-Time Password (OTP):
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 28px; font-weight: bold; color: #2c3e50; letter-spacing: 3px;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #888;">
          This OTP is valid for 5 minutes. If you did not request this, please ignore this email.
        </p>
        <p style="font-size: 16px; color: #333;">
          Regards,<br />
          <strong>Your App Team</strong>
        </p>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        next();
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: 'Error sending OTP email' });
    }
};

const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const storedOtp = await OTPModel.findOne({ email, otp });

    if (!storedOtp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (storedOtp.expiresAt < new Date().getTime()) {
        return res.status(400).json({ message: 'OTP has expired' });
    }

    next();
};

export { generateAndSendOtp, verifyOtp };
