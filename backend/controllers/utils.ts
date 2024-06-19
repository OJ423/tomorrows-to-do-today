import nodemailer from 'nodemailer';

const emailUser: string = process.env.EMAIL_USER as string;
const emailPassword: string = process.env.EMAIL_PASS as string;

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

export const sendVerificationEmail = (email:string, token:string) => {
  const url = `http://localhost:3000/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Tomorrow's to-do Today Verify Email`,
    html: `Please click the link to verify your email address: <a href="${url}">${url}</a>`
  };

  transporter.sendMail(mailOptions)
    .catch(error => {
      console.error('Error sending email:', error);
    });
}