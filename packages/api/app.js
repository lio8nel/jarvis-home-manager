const express = require('express');
const cors = require('cors');
const { discovery, api } = require('node-hue-api');
const v3 = require('node-hue-api').v3;

const app = express();

app.use(cors());
app.use(express.json());

// Configuration for Hue Bridge
const BRIDGE_USER = process.env.HUE_USER; // You'll need to set this
const BRIDGE_IP = process.env.HUE_BRIDGE_IP; // You'll need to set this

// Function to connect to the Hue Bridge
async function connectToBridge() {
  try {
    const authenticatedApi = await v3.api.createLocal(BRIDGE_IP).connect(BRIDGE_USER);
    return authenticatedApi;
  } catch (err) {
    console.error('Failed to connect to Hue bridge:', err);
    throw err;
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET endpoint for devices
app.get('/api/devices', async (req, res) => {
  try {
    const hueApi = await connectToBridge();
    const lights = await hueApi.lights.getAll();
    
    // Transform Hue lights into our device format
    const devices = lights.map(light => ({
      id: light.id,
      name: light.name,
      type: 'hue-light',
      status: light.state.on ? 'on' : 'off'
    }));
    
    res.json(devices);
  } catch (err) {
    console.error('Error fetching lights:', err);
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
});

module.exports = app; 