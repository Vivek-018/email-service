import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  brevo: {
    apiKey: process.env.BREVO_API_KEY,
    senderEmail: process.env.BREVO_SENDER_EMAIL,
    // templateId: Number(process.env.BREVO_TEMPLATE_ID),
  },
  pubsub: {
    projectId: process.env.GCP_PROJECT_ID,
    topicName: process.env.PUBSUB_TOPIC,
    subscriptionName: process.env.SUBSCRIPTION_NAME,
  }
};
