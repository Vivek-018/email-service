import express from 'express';
import emailRoutes from './routes/emailRoutes.js';
import { config } from './utils/config.js';
import { startEmailConsumer } from './pubsub/subscriber.js';

const app = express();

app.use(express.json());
app.use('/api', emailRoutes);

app.use("/api/health", (req, res) => res.send("Healthy"));

// Start consumer
startEmailConsumer();

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});
