import SibApiV3Sdk from "sib-api-v3-sdk";
import { config } from "../utils/config.js";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = config.brevo.apiKey;

// const templateApi = new SibApiV3Sdk.CreateSmtpTemplate();
const emailTemplatesApi = new SibApiV3Sdk.TransactionalEmailsApi();
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// Step 1: Create Template Dynamically
export const createEmailTemplate = async ({ name, subject, htmlContent }) => {
  const templateData = {
    sender: {
      name: "BulkMailer",
      email: config.brevo.senderEmail,
    },
    templateName: name,
    subject,
    htmlContent,
    isActive: true,
    tag: "auto-template",
  };

  // const res = await templateApi.createSmtpTemplate(templateData);
  const res = await emailTemplatesApi.createSmtpTemplate(templateData);

  console.log(`✅ Template created: ${res.id}`);
  return res.id;
};

// Step 2: Send Email Using Template
export const sendEmail = async ({ to, params }) => {
  try {
    // create sample htmlContent
    const htmlContent = `
  <p>Thank you for joining our service. We are excited to have you on board.</p>
  `;

    // Check/create template (you can cache templateId instead for prod use)
    const templateId = await createEmailTemplate({
      name: `Welcome-${Date.now()}`,
      subject: "Welcome {{username}}!",
      htmlContent: htmlContent,
    });

    await emailApi.sendTransacEmail({
      sender: { name: "BulkMailer", email: config.brevo.senderEmail },
      to: [{ email: to }],
      templateId,
      params,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(
      `❌ Failed to send email to ${to}:`,
      err.response?.body || err.message
    );
  }
};
