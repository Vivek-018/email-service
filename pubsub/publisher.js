import { PubSub } from '@google-cloud/pubsub';
import { config } from '../utils/config.js';

const pubsub = new PubSub({ projectId: config.pubsub.projectId });
const topic = pubsub.topic(config.pubsub.topicName);

export const publishEmailEvent = async (emailData) => {
  const buffer = Buffer.from(JSON.stringify(emailData));
  await topic.publishMessage({ data: buffer });
  console.log(`Published email event for: ${emailData.to}`);
};
