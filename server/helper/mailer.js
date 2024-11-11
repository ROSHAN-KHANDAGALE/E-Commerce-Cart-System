import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

var transport = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  secure: false,
  auth: {
    user: process.env.SENDER,
    pass: process.env.APP_SECRET,
  },
});

// console.log(transport);
const sendRegistrationEmail = (email, firstName, lastName, pass) => {
  const mailConfig = {
    from: `"No-reply" <${process.env.SENDER}>`,
    to: email,
    subject: "Your Temporary Password",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Hello ${firstName} ${lastName},</h2>
      <p>Your temporary password is:</p>
      <p style="font-size: 18px; font-weight: bold; background: #f0f0f0; padding: 10px; border-radius: 5px;">
        ${pass}
      </p>
      <p>Please use this password to log in and <strong>update your password immediately</strong>.</p>
      <p style="color: #555;">Thank you,</p>
    </div>
  `,
  };
  return transport.sendMail(mailConfig);
};

export default sendRegistrationEmail;
