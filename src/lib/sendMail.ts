import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT || "587"),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export async function sendOTPEmail(to: string, verification_link: string) {
  const mailOptions = {
    from: "podcastcontent2@gmail.com",
    to,
    subject: "Your OTP Code",
    html: `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 40px;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background: #111;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
    .logo img {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .message {
      font-size: 16px;
      margin-bottom: 20px;
      color: #ccc;
    }
    .btn {
      display: inline-block;
      background-color: #fff;
      color: #000;
      padding: 12px 24px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      transition: 0.3s;
    }
    .btn:hover {
      background-color: #ccc;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
    <h1 class="logo">FUND NEST</h1>
    </div>
    <div class="title">Verify Your Email</div>
    <div class="message">Click the button below to verify your email and activate your account.</div>
    <a href="${verification_link}" class="btn">Verify Email</a>
    <div class="footer">If you didn't request this, please ignore this email.</div>
  </div>
</body>
</html>

    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function sendResetPasswordEmail(to: string, reset_link: string) {
  const mailOptions = {
    from: "noreply@yourapp.com",
    to,
    subject: "Reset Your Password",
    html: `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 40px;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background: #111;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .message {
      font-size: 16px;
      margin-bottom: 20px;
      color: #ccc;
    }
    .btn {
      display: inline-block;
      background-color: #fff;
      color: #000;
      padding: 12px 24px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      transition: 0.3s;
    }
    .btn:hover {
      background-color: #ccc;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="logo">FUND NEST</h1>
    <div class="title">Reset Your Password</div>
    <div class="message">Click the button below to reset your password. If you didn't request this, ignore this email.</div>
    <a href="${reset_link}" class="btn">Reset Password</a>
    <div class="footer">If you didn't request this, please ignore this email.</div>
  </div>
</body>
</html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset link sent to ${to}`);
  } catch (error) {
    console.error("Error sending reset password email:", error);
  }
}
