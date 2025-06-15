# Email Service

A Node.js microservice for sending emails using Brevo (formerly Sendinblue) and Google Cloud Pub/Sub. This service provides RESTful APIs to send emails and supports asynchronous email processing via Pub/Sub.

## Features

- Send transactional emails using Brevo API
- Asynchronous email processing with Google Cloud Pub/Sub
- RESTful API endpoints for email operations
- Environment-based configuration
- Easily extensible and production-ready

## Prerequisites

- Node.js (v16+ recommended)
- npm
- Google Cloud account (for Pub/Sub)
- Brevo (Sendinblue) account

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/email-service.git
cd email-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Copy the sample environment file and fill in your credentials:

```bash
cp .env.local.sample .env
```

Edit `.env` and provide the following values:

| Variable                       | Description                                |
| ------------------------------ | ------------------------------------------ |
| PORT                           | Port to run the server (default: 3000)     |
| BREVO_API_KEY                  | Your Brevo (Sendinblue) API key            |
| GOOGLE_APPLICATION_CREDENTIALS | Path to your Google service account JSON   |
| BREVO_SENDER_EMAIL             | Sender email address (verified in Brevo)   |
| BREVO_TEMPLATE_ID              | Brevo template ID for transactional emails |
| GCP_PROJECT_ID                 | Google Cloud Project ID                    |
| PUBSUB_TOPIC                   | Pub/Sub topic name for emails              |
| SUBSCRIPTION_NAME              | Pub/Sub subscription name                  |

### 4. Google Cloud Setup

- Create a Pub/Sub topic and subscription in your Google Cloud project.
- Download the service account JSON key and place it in the project root.
- Set the `GOOGLE_APPLICATION_CREDENTIALS` variable in `.env` to the path of this file.

### 5. Run the Service

For development (with auto-reload):

```bash
npm run dev
```

Or for production:

```bash
node app.js
```

The server will start on `http://localhost:3000` (or your specified port).

## API Endpoints

### Send Email

**POST** `/api/send-bulk-email`

**Request Body:**

```json
{
  "users": [
    { "email": "test1@example.com", "name": "test1" },
    { "email": "test2@example.com", "name": "test2" }
    // add more emails
  ]
}
```

**Response:**

- `200 OK` on success
- `400 Bad Request` for invalid input

### Health Check

**GET** `/api/health`

Returns a simple status message.

## Project Structure

```
.
├── app.js
├── controllers/
│   └── emailController.js
├── pubsub/
│   ├── publisher.js
│   └── subscriber.js
├── routes/
│   └── emailRoutes.js
├── services/
│   ├── brevoService.js
├── utils/
│   └── config.js
├── .env
├── package.json
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the ISC License.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [Brevo (Sendinblue) API](https://www.brevo.com/)
- [Google Cloud Pub/Sub](https://cloud.google.com/pubsub)
