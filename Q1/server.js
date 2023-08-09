//making my own api using express
const express = require('express');
const app = express();
const Apireq = require('./axio');
const p = process.env.PORT || 3000;

app.get('/trainData', async (req, res) => {
    const trainsData = await Apireq(); // data received from axio.js
  try {
    const now = new Date(); // Current time
  const filter = trainsData.filter(train => {// Filter trains departing in the next 30 minutes
    const dt = new Date(now);
    dt.setHours(train.departureTime.Hours);
    dt.setMinutes(train.departureTime.Minutes);
    dt.setSeconds(train.departureTime.Seconds);
    const t= dt.getTime() - now.getTime();
    const diff = t / (1000 * 60); //converting to minutes
    return diff > 30;
  });
  const sortedTrains = filter.sort((a, b) => {// Sort filtered trains based on the specified criteria
    // Compare based on price for sleeper class
    if (a.price.sleeper !== b.price.sleeper) {
      return a.price.sleeper - b.price.sleeper;//if -ve then a comes before  b and vice-versa
    }
    // If prices are the same, compare based on seats available for sleeper class
    if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
      return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper; //if -ve then b comes before  a and vice-versa
    }
    // If prices and seats available are the same, compare based on departure time (including delays)
    const aDepartureTime = a.departureTime.Hours * 60 + a.departureTime.Minutes + a.delayedBy;
    const bDepartureTime = b.departureTime.Hours * 60 + b.departureTime.Minutes + b.delayedBy;
    return bDepartureTime - aDepartureTime;
  });

  res.json(sortedTrains);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'An error occurred' });
  }
});

app.listen(p, () => {
  console.log(`Server is running on port ${p}`);
});
