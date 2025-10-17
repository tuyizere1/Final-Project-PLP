const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { startReminderJob } = require('./jobs/reminderJob');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// mount routers (example)
app.use('/api/vaccinations', require('./routes/vaccinations'));
// ... other routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  startReminderJob();
});


