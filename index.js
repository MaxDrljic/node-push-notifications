const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json);

const publicVapidKey = 'BGPsTclBFb8PNIGbcJHGCzTg8WBlKM_9ZbsEmGdPAnzDZ8h-8lRleO9svq3n7jZr7PacqG-Ws3OFnkcXtyNlhaM';
const privateVapidKey = 'MqCsqYA2dp_XqnbBrZUFy93HwGCCKxtGvBev6k_ZubM';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' });

  // Pass object into sendNotification
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
