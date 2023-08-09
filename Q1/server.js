const express = require('express');
const app = express();
//making my own api using express
const Apireq = require('./axio');
const p = process.env.PORT || 3000;

app.get('/trainData', async (req, res) => {
  try {
    const trainsData = await Apireq();
    res.json(trainsData); // Send the data received from axio.js
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'An error occurred' });
  }
});

app.listen(p, () => {
  console.log(`Server is running on port ${p}`);
});
