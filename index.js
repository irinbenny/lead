const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Generate VERIFY_TOKEN using crypto module
const VERIFY_TOKEN = crypto.randomBytes(16).toString('hex');
console.log('Your VERIFY_TOKEN:', VERIFY_TOKEN);

// Verification endpoint for Facebook
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Endpoint to receive lead data
app.post('/webhook', (req, res) => {
    console.log(req.url);
  const leadData = req.body;

  console.log('Lead Data:', leadData);

  // Process the lead data (e.g., save to database)
  // ...

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});