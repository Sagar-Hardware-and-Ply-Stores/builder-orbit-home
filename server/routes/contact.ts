import { RequestHandler } from "express";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  projectType?: string;
  urgency: string;
}

export const handleContactForm: RequestHandler = async (req, res) => {
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
        required: ["name", "email", "subject", "message"],
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Create email content
    const emailSubject = `Contact Form: ${formData.subject}`;
    const emailBody = `
New Contact Form Submission from Sagar Hardware & Ply Stores Website

Contact Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || "Not provided"}
- Project Type: ${formData.projectType || "Not specified"}
- Urgency: ${formData.urgency}

Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from the Sagar Hardware & Ply Stores contact form.
Reply directly to this email to respond to the customer.
    `;

    // In a real implementation, you would use a service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - AWS SES
    // - Other email service providers

    // For now, we'll simulate the email sending process
    // and log the details (in production, replace this with actual email sending)

    console.log("=== CONTACT FORM SUBMISSION ===");
    console.log("To: bhandarisagar512@gmail.com");
    console.log("Subject:", emailSubject);
    console.log("Body:", emailBody);
    console.log("============================");

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real implementation, you might also:
    // 1. Save the contact form submission to a database
    // 2. Send an auto-reply to the customer
    // 3. Add to a CRM system
    // 4. Send notifications to multiple team members

    res.status(200).json({
      success: true,
      message:
        "Your message has been sent successfully! We'll get back to you within 24 hours.",
      submissionId: `CONTACT_${Date.now()}`, // Generate a unique ID for tracking
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      error: "Internal server error",
      message:
        "Sorry, there was an error processing your request. Please try again or contact us directly.",
    });
  }
};

// Additional utility functions that could be used:

// Function to sanitize input data
export const sanitizeContactData = (data: any): ContactFormData => {
  return {
    name: String(data.name || "").trim(),
    email: String(data.email || "")
      .trim()
      .toLowerCase(),
    phone: data.phone ? String(data.phone).trim() : undefined,
    subject: String(data.subject || "").trim(),
    message: String(data.message || "").trim(),
    projectType: data.projectType ? String(data.projectType).trim() : undefined,
    urgency: String(data.urgency || "medium").trim(),
  };
};

// Function to validate contact data
export const validateContactData = (data: ContactFormData): string[] => {
  const errors: string[] = [];

  if (!data.name) errors.push("Name is required");
  if (!data.email) errors.push("Email is required");
  if (!data.subject) errors.push("Subject is required");
  if (!data.message) errors.push("Message is required");

  if (data.name && data.name.length < 2)
    errors.push("Name must be at least 2 characters");
  if (data.subject && data.subject.length < 5)
    errors.push("Subject must be at least 5 characters");
  if (data.message && data.message.length < 10)
    errors.push("Message must be at least 10 characters");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  return errors;
};
