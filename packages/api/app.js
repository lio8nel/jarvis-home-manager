const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET endpoint for devices
app.get('/api/devices', (req, res) => {
  // This is example data - you would typically fetch this from a database
  const devices = [
    { id: 1, name: "Living Room Light", type: "hue-light", status: "on" },
    { id: 2, name: "Kitchen Light", type: "hue-light", status: "off" },
    { id: 3, name: "Kitchen shutter", type: "somfy-shutter", status: "off" },
  ];
  
  res.json(devices);
});

module.exports = app; 