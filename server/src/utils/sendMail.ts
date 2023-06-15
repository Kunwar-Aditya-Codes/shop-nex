import nodemailer from 'nodemailer';

export const sendVerificationEmailToUser = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
    <!DOCTYPE html>
    <body>
      <h2>Email Verification</h2>
      <p>Dear User,</p>
      <p>Thank you for signing up. Please use the following OTP (One-Time Password) to verify your email address:</p>
      <h2 style="text-align: center;">OTP: ${otp} <span id="otp"></span></h2>
      <p><strong>Note:</strong> This OTP is valid for 5 minutes only. If you did not sign up for an account, please ignore this email.</p>
      <p>Regards,<br>Shop Nex</p>
    </body>
    </html>
    `,
  });

  return info;
};
