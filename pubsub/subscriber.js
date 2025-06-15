import { PubSub } from '@google-cloud/pubsub';
import { config } from '../utils/config.js';
import { sendEmail } from '../services/brevoService.js';
// import { sendEmail } from '../services/mailerService.js';

const pubsub = new PubSub({ projectId: config.pubsub.projectId });
const subscription = pubsub.subscription(config.pubsub.subscriptionName);

export const startEmailConsumer = () => {
  subscription.on('message', async (message) => {
    const data = JSON.parse(message.data.toString());
    console.log(`📥 Received email event for: ${data.to}`);
    await sendEmail(data);
    message.ack();
  });

  subscription.on('error', (err) => {
    console.error('Subscriber error:', err.message);
  });

  console.log('📩 Email subscriber started');
};
