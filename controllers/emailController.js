import { publishEmailEvent } from '../pubsub/publisher.js';

export const sendBulkEmails = async (req, res) => {
  const { users } = req.body;

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: 'Invalid users array' });
  }

  try {
    for (const user of users) {
      await publishEmailEvent({
        to: user.email,
        params: { username: user.name }
      });
    }

    res.json({ message: 'Emails published to queue' });
  } catch (error) {
    console.error('Failed to send bulk emails:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
