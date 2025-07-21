import nodemailer from "nodemailer";

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send OTP email
export const sendOTPEmail = async (
  email: string,
  otp: string,
  name: string
) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from:
        process.env.EMAIL_FROM ||
        '"Ultimate Tours" <noreply@ultimatetours.com>',
      to: email,
      subject: "Verify Your Email - Ultimate Tours",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification - Ultimate Tours</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Ultimate Tours</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Your Travel Partner</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Hi ${name}!</h2>
            <p>Thank you for signing up with Ultimate Tours. To complete your registration and verify your email address, please use the following verification code:</p>
            
            <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
              <h3 style="margin: 0; color: #667eea; font-size: 32px; letter-spacing: 5px; font-weight: bold;">${otp}</h3>
            </div>
            
            <p><strong>Important:</strong></p>
            <ul style="color: #666;">
              <li>This verification code will expire in ${
                process.env.OTP_EXPIRY_MINUTES || 10
              } minutes</li>
              <li>For security reasons, please do not share this code with anyone</li>
              <li>If you didn't request this verification, please ignore this email</li>
            </ul>
            
            <p>Once verified, you'll be able to:</p>
            <ul style="color: #667eea;">
              <li>✈️ Browse and book amazing tour packages</li>
              <li>❤️ Save your favorite destinations to wishlist</li>
              <li>🎯 Get personalized travel recommendations</li>
              <li>📞 Access priority customer support</li>
            </ul>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">
            
            <p style="font-size: 14px; color: #666; text-align: center;">
              Need help? Contact us at support@ultimatetours.com<br>
              Ultimate Tours - Catch Your Smile 😊
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Hi ${name}!
        
        Thank you for signing up with Ultimate Tours. 
        
        Your verification code is: ${otp}
        
        This code will expire in ${
          process.env.OTP_EXPIRY_MINUTES || 10
        } minutes.
        
        If you didn't request this verification, please ignore this email.
        
        Best regards,
        Ultimate Tours Team
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Send welcome email after successful verification
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from:
        process.env.EMAIL_FROM ||
        '"Ultimate Tours" <noreply@ultimatetours.com>',
      to: email,
      subject: "Welcome to Ultimate Tours! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Ultimate Tours</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to Ultimate Tours!</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Catch Your Smile</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Hello ${name}!</h2>
            <p>🎊 Congratulations! Your email has been successfully verified and your Ultimate Tours account is now active.</p>
            
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 25px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">What's Next?</h3>
              <ul style="color: #666; padding-left: 20px;">
                <li>🌍 Explore our amazing domestic and international packages</li>
                <li>❤️ Create your travel wishlist</li>
                <li>📱 Book your dream vacation</li>
                <li>⭐ Rate and review your experiences</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Start Exploring 🚀
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">
            
            <p style="font-size: 14px; color: #666; text-align: center;">
              Follow us on social media for travel tips and exclusive offers!<br>
              Questions? Contact us at support@ultimatetours.com<br><br>
              <strong>Ultimate Tours - Catch Your Smile 😊</strong>
            </p>
          </div>
        </body>
        </html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Send forgot password OTP email
export const sendForgotPasswordOTP = async (
  email: string,
  name: string,
  otp: string
) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from:
        process.env.EMAIL_FROM ||
        '"Ultimate Tours" <noreply@ultimatetours.com>',
      to: email,
      subject: "Password Reset Code - Ultimate Tours",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - Ultimate Tours</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc3545 0%, #6610f2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Password Reset</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Ultimate Tours</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Hi ${name}!</h2>
            <p>We received a request to reset your password for your Ultimate Tours account. To proceed with the password reset, please use the following verification code:</p>
            
            <div style="background: white; border: 2px dashed #dc3545; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
              <h3 style="margin: 0; color: #dc3545; font-size: 32px; letter-spacing: 5px; font-weight: bold;">${otp}</h3>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;"><strong>⚠️ Security Notice:</strong></p>
              <ul style="color: #856404; margin: 10px 0 0 0;">
                <li>This code will expire in ${
                  process.env.OTP_EXPIRY_MINUTES || 10
                } minutes</li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Your password will remain unchanged unless you complete the reset process</li>
              </ul>
            </div>
            
            <p style="margin-top: 25px;">Once you've verified the code, you'll be able to set a new password for your account.</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">
            
            <p style="font-size: 14px; color: #666; text-align: center;">
              If you're having trouble, contact our support team at support@ultimatetours.com<br>
              Ultimate Tours - Catch Your Smile 😊
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        Hi ${name}!
        
        We received a request to reset your password for your Ultimate Tours account.
        
        Your password reset code is: ${otp}
        
        This code will expire in ${
          process.env.OTP_EXPIRY_MINUTES || 10
        } minutes.
        
        If you didn't request this reset, please ignore this email.
        
        Best regards,
        Ultimate Tours Team
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(
      "Forgot password OTP email sent successfully:",
      result.messageId
    );
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending forgot password OTP email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
