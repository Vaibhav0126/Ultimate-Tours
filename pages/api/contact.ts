import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = "ultimatetours1@gmail.com";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  travelType?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData: ContactFormData = req.body;

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // Create email content
    const emailContent = `
New Contact Form Submission from Ultimate Tours Website

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Travel Type: ${formData.travelType || "Not specified"}
Subject: ${formData.subject}

Message:
${formData.message}

---
This email was sent from the Ultimate Tours contact form.
Contact the customer at: ${formData.email}
    `.trim();

    // Log for debugging
    console.log("=== CONTACT FORM SUBMISSION ===");
    console.log(`To: ${ADMIN_EMAIL}`);
    console.log(`Subject: New Contact Form: ${formData.subject}`);
    console.log(`Content:\n${emailContent}`);
    console.log("================================");

    // Check if email configuration is set up
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      process.env.EMAIL_PASS === "your-app-password-here"
    ) {
      console.error(
        "Email configuration missing! Check EMAIL_SETUP_INSTRUCTIONS.md"
      );

      return res.status(200).json({
        message: "Message received! We'll get back to you within 24 hours.",
        note: "Email configuration needed for confirmations - check server logs",
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to admin
    try {
      await transporter.sendMail({
        from: `"Ultimate Tours Contact Form" <${
          process.env.EMAIL_USER || ADMIN_EMAIL
        }>`,
        to: ADMIN_EMAIL,
        subject: `New Contact Form: ${formData.subject} - ${formData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 30px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0; font-size: 28px;">Ultimate Tours</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0;">New Contact Form Submission</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px;">Contact Form Details</h2>
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af; margin: 25px 0;">
                <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 16px;">Customer Information:</h3>
                <p style="color: #374151; margin: 8px 0;"><strong>Name:</strong> ${
                  formData.name
                }</p>
                <p style="color: #374151; margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
                  formData.email
                }" style="color: #1e40af; text-decoration: none;">${
          formData.email
        }</a></p>
                <p style="color: #374151; margin: 8px 0;"><strong>Phone:</strong> ${
                  formData.phone
                    ? `<a href="tel:${formData.phone}" style="color: #1e40af; text-decoration: none;">${formData.phone}</a>`
                    : "Not provided"
                }</p>
                ${
                  formData.travelType
                    ? `<p style="color: #374151; margin: 8px 0;"><strong>Travel Type:</strong> ${formData.travelType}</p>`
                    : ""
                }
              </div>
              
              <div style="margin: 25px 0;">
                <h3 style="color: #374151; margin: 0 0 10px 0;">Subject:</h3>
                <p style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0 0 20px 0;">${
                  formData.subject
                }</p>
                
                <h3 style="color: #374151; margin: 0 0 10px 0;">Message:</h3>
                <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #1e40af; border-radius: 4px;">
                  <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${
                    formData.message
                  }</p>
                </div>
              </div>
              
              <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                <h3 style="color: #1e40af; margin: 0 0 15px 0;">Quick Actions</h3>
                <a href="mailto:${
                  formData.email
                }?subject=Re: ${encodeURIComponent(formData.subject)}" 
                   style="background-color: #1e40af; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                  Reply to Customer
                </a>
                ${
                  formData.phone
                    ? `
                <a href="tel:${formData.phone}" 
                   style="background-color: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                  Call Customer
                </a>`
                    : ""
                }
              </div>
              
              <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 0;"><strong>Received:</strong> ${new Date().toLocaleString(
                  "en-IN"
                )}</p>
                <p style="margin: 10px 0 0 0;">This email was automatically generated from the Ultimate Tours contact form.</p>
              </div>
            </div>
          </div>
        `,
        text: emailContent,
        replyTo: formData.email,
      });

      console.log(
        "Admin notification email sent successfully to:",
        ADMIN_EMAIL
      );

      // Send thank you email to customer
      await transporter.sendMail({
        from: `"Ultimate Tours" <${process.env.EMAIL_USER || ADMIN_EMAIL}>`,
        to: formData.email,
        subject: "Thank You for Contacting Ultimate Tours",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 30px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0; font-size: 28px;">Ultimate Tours</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0;">Your Travel Dreams, Our Expertise</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px;">Thank You for Contacting Us!</h2>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Dear ${formData.name},
              </p>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Thank you for reaching out to Ultimate Tours! We have received your message and truly appreciate your interest in our travel services.
              </p>
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af; margin: 25px 0;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">Your Message Details:</h3>
                <p style="color: #374151; margin: 5px 0;"><strong>Subject:</strong> ${
                  formData.subject
                }</p>
                <p style="color: #374151; margin: 5px 0;"><strong>Travel Type:</strong> ${
                  formData.travelType || "Not specified"
                }</p>
              </div>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Our travel experts will review your inquiry carefully and get back to you within <strong>24 hours</strong>. We're excited to help you plan your perfect travel experience!
              </p>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 25px;">
                In the meantime, feel free to:
              </p>
              
              <ul style="color: #374151; line-height: 1.6; margin-bottom: 25px; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Browse our featured tour packages</li>
                <li style="margin-bottom: 8px;">Follow us on social media for travel inspiration</li>
                <li style="margin-bottom: 8px;">Call us at <strong>+91 98039-29900</strong> for immediate assistance</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://ultimatetours.com"
                }/packages" 
                   style="background-color: #1e40af; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Explore Our Packages
                </a>
              </div>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 10px;">
                Best regards,<br>
                <strong>The Ultimate Tours Team</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                📧 <a href="mailto:${ADMIN_EMAIL}" style="color: #1e40af; text-decoration: none;">${ADMIN_EMAIL}</a> | 
                📞 +91 98039-29900 | +91 9965-50443
              </p>
              <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
                SCO-70, Mugal Canal, Karnal, 132001, Haryana, India
              </p>
            </div>
          </div>
        `,
        text: `
Thank You for Contacting Ultimate Tours!

Dear ${formData.name},

Thank you for reaching out to Ultimate Tours! We have received your message and truly appreciate your interest in our travel services.

Your Message Details:
- Subject: ${formData.subject}
- Travel Type: ${formData.travelType || "Not specified"}

Our travel experts will review your inquiry carefully and get back to you within 24 hours. We're excited to help you plan your perfect travel experience!

In the meantime, feel free to:
- Browse our featured tour packages
- Follow us on social media for travel inspiration  
- Call us at +91 98039-29900 for immediate assistance

Best regards,
The Ultimate Tours Team

Contact Information:
Email: ${ADMIN_EMAIL}
Phone: +91 98039-29900 | +91 9965-50443
Address: SCO-70, Mugal Canal, Karnal, 132001, Haryana, India
        `.trim(),
      });

      console.log("Thank you email sent successfully to:", formData.email);

      return res.status(200).json({
        message:
          "Message sent successfully! Check your email for a confirmation and we'll get back to you within 24 hours.",
      });
    } catch (emailError: any) {
      console.error("Email sending failed:", emailError);

      // Provide specific error messages for common issues
      let errorNote = "Email delivery failed";

      if (emailError.code === "EAUTH") {
        errorNote =
          "Email authentication failed - check your Gmail App Password";
      } else if (emailError.code === "ENOTFOUND") {
        errorNote =
          "Network connection failed - check your internet connection";
      } else if (emailError.responseCode === 535) {
        errorNote =
          "Invalid email credentials - verify your Gmail App Password";
      }

      console.error("Error details:", errorNote);

      // Return error to user with helpful message
      return res.status(500).json({
        message:
          "Message received, but email delivery failed. Please try again or contact us directly.",
        error: errorNote,
      });
    }
  } catch (error) {
    console.error("Error handling contact form:", error);
    return res.status(500).json({
      error: "Failed to submit contact form",
    });
  }
}
