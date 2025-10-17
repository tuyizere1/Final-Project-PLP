const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const vaccinationRoutes = require('./routes/vaccination');
const hygieneRoutes = require('./routes/hygiene');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/users', userRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/hygiene', hygieneRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

