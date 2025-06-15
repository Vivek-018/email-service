import express from 'express';
import { sendBulkEmails } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send-bulk-email', sendBulkEmails);

export default router;

