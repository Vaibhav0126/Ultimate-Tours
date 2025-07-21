import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  packageTitle?: string;
  packageId?: string;
  travelers: number;
  dateFrom: string;
  dateTo: string;
  totalPrice: string;
  inquiryType: "package" | "wishlist";
  packages?: Array<{
    id: string;
    title: string;
    price: string;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const inquiryData: InquiryData = req.body;

    // Validate required fields
    if (!inquiryData.name || !inquiryData.email || !inquiryData.phone) {
      return res
        .status(400)
        .json({ error: "Name, email, and phone are required" });
    }

    // Log inquiry to console (in production, you'd save to database)
    console.log("\n🎯 NEW TRAVEL INQUIRY RECEIVED");
    console.log("=====================================");
    console.log(`Name: ${inquiryData.name}`);
    console.log(`Email: ${inquiryData.email}`);
    console.log(`Phone: ${inquiryData.phone}`);
    console.log(`Inquiry Type: ${inquiryData.inquiryType}`);

    if (inquiryData.inquiryType === "package") {
      console.log(
        `Package: ${inquiryData.packageTitle} (ID: ${inquiryData.packageId})`
      );
      console.log(`Travelers: ${inquiryData.travelers}`);
      console.log(
        `Travel Dates: ${inquiryData.dateFrom} to ${inquiryData.dateTo}`
      );
      console.log(`Estimated Cost: ${inquiryData.totalPrice}`);
    } else if (inquiryData.inquiryType === "wishlist" && inquiryData.packages) {
      console.log(`Wishlist Packages: ${inquiryData.packages.length}`);
      inquiryData.packages.forEach((pkg, index) => {
        console.log(`  ${index + 1}. ${pkg.title} - ${pkg.price}`);
      });
    }

    if (inquiryData.message) {
      console.log(`Message: ${inquiryData.message}`);
    }
    console.log(`Timestamp: ${new Date().toLocaleString()}`);
    console.log("=====================================\n");

    // Send email notification if configured
    if (
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      process.env.EMAIL_PASS !== "your-app-password-here"
    ) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Email to admin
        const adminEmailContent =
          inquiryData.inquiryType === "package"
            ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 30px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0; font-size: 28px;">Ultimate Tours</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0;">New Package Inquiry</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px;">Package Booking Inquiry</h2>
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af; margin: 25px 0;">
                <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 16px;">Customer Information:</h3>
                <p style="color: #374151; margin: 8px 0;"><strong>Name:</strong> ${
                  inquiryData.name
                }</p>
                <p style="color: #374151; margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
                  inquiryData.email
                }" style="color: #1e40af; text-decoration: none;">${
                inquiryData.email
              }</a></p>
                <p style="color: #374151; margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${
                  inquiryData.phone
                }" style="color: #1e40af; text-decoration: none;">${
                inquiryData.phone
              }</a></p>
              </div>
              
              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #059669; margin: 25px 0;">
                <h3 style="color: #059669; margin: 0 0 15px 0; font-size: 16px;">Package Details:</h3>
                <p style="color: #374151; margin: 8px 0;"><strong>Package:</strong> ${
                  inquiryData.packageTitle
                }</p>
                <p style="color: #374151; margin: 8px 0;"><strong>Package ID:</strong> ${
                  inquiryData.packageId
                }</p>
                <p style="color: #374151; margin: 8px 0;"><strong>Number of Travelers:</strong> ${
                  inquiryData.travelers
                } ${inquiryData.travelers === 1 ? "person" : "people"}</p>
                <p style="color: #374151; margin: 8px 0;"><strong>Travel Date:</strong> ${new Date(
                  inquiryData.dateFrom
                ).toLocaleDateString("en-IN")}</p>
                <p style="color: #374151; margin: 8px 0;"><strong>Estimated Cost:</strong> ${
                  inquiryData.totalPrice
                }</p>
              </div>
              
              ${
                inquiryData.message
                  ? `
              <div style="margin: 25px 0;">
                <h3 style="color: #374151; margin: 0 0 10px 0;">Additional Message:</h3>
                <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #6b7280; border-radius: 4px;">
                  <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${inquiryData.message}</p>
                </div>
              </div>`
                  : ""
              }
              
              <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                <h3 style="color: #1e40af; margin: 0 0 15px 0;">Quick Actions</h3>
                <a href="mailto:${
                  inquiryData.email
                }?subject=Re: ${encodeURIComponent(
                inquiryData.packageTitle + " - Travel Inquiry"
              )}" 
                   style="background-color: #1e40af; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                  Reply to Customer
                </a>
                <a href="tel:${inquiryData.phone}" 
                   style="background-color: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                  Call Customer
                </a>
              </div>
              
              <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 0;"><strong>Received:</strong> ${new Date().toLocaleString(
                  "en-IN"
                )}</p>
                <p style="margin: 10px 0 0 0;">This email was automatically generated from the Ultimate Tours package inquiry form.</p>
              </div>
            </div>
          </div>
            `
            : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 30px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0; font-size: 28px;">Ultimate Tours</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0;">New Wishlist Inquiry</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px;">Wishlist Inquiry - ${
                inquiryData.packages?.length || 0
              } Packages</h2>
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af; margin: 25px 0;">
                <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 16px;">Customer Information:</h3>
                <p style="color: #374151; margin: 8px 0;"><strong>Name:</strong> ${
                  inquiryData.name
                }</p>
                <p style="color: #374151; margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
                  inquiryData.email
                }" style="color: #1e40af; text-decoration: none;">${
                inquiryData.email
              }</a></p>
                <p style="color: #374151; margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${
                  inquiryData.phone
                }" style="color: #1e40af; text-decoration: none;">${
                inquiryData.phone
              }</a></p>
              </div>
              
              <div style="background-color: #fdf4ff; padding: 20px; border-radius: 8px; border-left: 4px solid #a855f7; margin: 25px 0;">
                <h3 style="color: #a855f7; margin: 0 0 15px 0; font-size: 16px;">Interested Packages:</h3>
                ${
                  inquiryData.packages
                    ?.map(
                      (pkg, index) => `
                  <div style="background-color: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e5e7eb;">
                    <p style="color: #374151; margin: 4px 0;"><strong>${
                      index + 1
                    }. ${pkg.title}</strong></p>
                    <p style="color: #6b7280; margin: 4px 0; font-size: 14px;">Price: ${
                      pkg.price
                    } | ID: ${pkg.id}</p>
                  </div>
                `
                    )
                    .join("") ||
                  '<p style="color: #6b7280; font-style: italic;">No packages found</p>'
                }
              </div>
              
              ${
                inquiryData.message
                  ? `
              <div style="margin: 25px 0;">
                <h3 style="color: #374151; margin: 0 0 10px 0;">Additional Message:</h3>
                <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #6b7280; border-radius: 4px;">
                  <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${inquiryData.message}</p>
                </div>
              </div>`
                  : ""
              }
              
              <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                <h3 style="color: #1e40af; margin: 0 0 15px 0;">Quick Actions</h3>
                <a href="mailto:${
                  inquiryData.email
                }?subject=Re: Your Ultimate Tours Wishlist Inquiry" 
                   style="background-color: #1e40af; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                  Reply to Customer
                </a>
                <a href="tel:${inquiryData.phone}" 
                   style="background-color: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                  Call Customer
                </a>
              </div>
              
              <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 0;"><strong>Received:</strong> ${new Date().toLocaleString(
                  "en-IN"
                )}</p>
                <p style="margin: 10px 0 0 0;">This email was automatically generated from the Ultimate Tours wishlist inquiry form.</p>
              </div>
            </div>
          </div>
          `;

        await transporter.sendMail({
          from: `"Ultimate Tours" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject:
            inquiryData.inquiryType === "package"
              ? `New Package Inquiry: ${inquiryData.packageTitle} - ${inquiryData.name} (${inquiryData.travelers} travelers)`
              : `New Wishlist Inquiry: ${
                  inquiryData.packages?.length || 0
                } packages - ${inquiryData.name}`,
          html: adminEmailContent,
        });

        // Send professional thank you email to customer
        const customerEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 30px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0; font-size: 28px;">Ultimate Tours</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0;">Your Travel Dreams, Our Expertise</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 20px;">Thank You for Your Travel Inquiry!</h2>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Dear ${inquiryData.name},
              </p>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Thank you for your interest in our travel services! We have received your inquiry and are excited to help you plan your perfect trip.
              </p>
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #1e40af; margin: 25px 0;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">Your Inquiry Details:</h3>
                ${
                  inquiryData.inquiryType === "package"
                    ? `
                  <p style="color: #374151; margin: 5px 0;"><strong>Package:</strong> ${
                    inquiryData.packageTitle
                  }</p>
                  <p style="color: #374151; margin: 5px 0;"><strong>Travelers:</strong> ${
                    inquiryData.travelers
                  } ${inquiryData.travelers === 1 ? "person" : "people"}</p>
                  <p style="color: #374151; margin: 5px 0;"><strong>Travel Date:</strong> ${new Date(
                    inquiryData.dateFrom
                  ).toLocaleDateString()}</p>
                  <p style="color: #374151; margin: 5px 0;"><strong>Estimated Cost:</strong> ${
                    inquiryData.totalPrice
                  } (approx)</p>
                `
                    : `
                  <p style="color: #374151; margin: 5px 0;"><strong>Inquiry Type:</strong> Multiple packages from wishlist</p>
                  <p style="color: #374151; margin: 5px 0;"><strong>Number of Packages:</strong> ${
                    inquiryData.packages?.length || 0
                  }</p>
                `
                }
              </div>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Our travel experts will review your inquiry carefully and get back to you within <strong>24 hours</strong> with a customized travel proposal tailored to your preferences.
              </p>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 25px;">
                In the meantime, feel free to:
              </p>
              
              <ul style="color: #374151; line-height: 1.6; margin-bottom: 25px; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Browse our other amazing travel packages</li>
                <li style="margin-bottom: 8px;">Follow us on social media for travel inspiration</li>
                <li style="margin-bottom: 8px;">Call us at <strong>+91 98039-29900</strong> for immediate assistance</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://ultimatetours.com"
                }/packages" 
                   style="background-color: #1e40af; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Explore More Packages
                </a>
              </div>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 10px;">
                Best regards,<br>
                <strong>The Ultimate Tours Team</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                📧 <a href="mailto:ultimatetours1@gmail.com" style="color: #1e40af; text-decoration: none;">ultimatetours1@gmail.com</a> | 
                📞 +91 98039-29900 | +91 9965-50443
              </p>
              <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
                SCO-70, Mugal Canal, Karnal, 132001, Haryana, India
              </p>
            </div>
          </div>
        `;

        const customerEmailText = `
Thank You for Your Travel Inquiry!

Dear ${inquiryData.name},

Thank you for your interest in our travel services! We have received your inquiry and are excited to help you plan your perfect trip.

Your Inquiry Details:
${
  inquiryData.inquiryType === "package"
    ? `
- Package: ${inquiryData.packageTitle}
- Travelers: ${inquiryData.travelers} ${
        inquiryData.travelers === 1 ? "person" : "people"
      }
- Travel Date: ${new Date(inquiryData.dateFrom).toLocaleDateString()}
- Estimated Cost: ${inquiryData.totalPrice} (approx)`
    : `
- Inquiry Type: Multiple packages from wishlist
- Number of Packages: ${inquiryData.packages?.length || 0}`
}

Our travel experts will review your inquiry carefully and get back to you within 24 hours with a customized travel proposal tailored to your preferences.

In the meantime, feel free to:
- Browse our other amazing travel packages
- Follow us on social media for travel inspiration
- Call us at +91 98039-29900 for immediate assistance

Best regards,
The Ultimate Tours Team

Contact Information:
Email: ultimatetours1@gmail.com
Phone: +91 98039-29900 | +91 9965-50443
Address: SCO-70, Mugal Canal, Karnal, 132001, Haryana, India
        `.trim();

        await transporter.sendMail({
          from: `"Ultimate Tours" <${process.env.EMAIL_USER}>`,
          to: inquiryData.email,
          subject: "Thank You for Your Travel Inquiry - Ultimate Tours",
          html: customerEmailHtml,
          text: customerEmailText,
        });

        console.log("📧 Inquiry emails sent successfully");
      } catch (emailError) {
        console.error("📧 Email sending failed:", emailError);
        // Don't fail the request if email fails
      }
    }

    return res.status(200).json({
      message:
        "Inquiry sent successfully! Check your email for a confirmation and we'll get back to you within 24 hours.",
      id: Date.now().toString(), // In production, use proper ID generation
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return res.status(500).json({ error: "Failed to process inquiry" });
  }
}
