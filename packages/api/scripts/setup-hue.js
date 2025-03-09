const v3 = require('node-hue-api').v3;
const discovery = v3.discovery;
const hueApi = v3.api;

const appName = 'home-dashboard';
const deviceName = 'home-dashboard-api';

async function discoverAndCreateUser() {
  // Find the bridge
  const discoveryResults = await discovery.nupnpSearch();
  
  if (discoveryResults.length === 0) {
    console.error('Failed to find any Hue Bridges');
    return;
  }
  
  const bridge = discoveryResults[0];
  console.log('Found Bridge:', bridge.ipaddress);
  
  // Create an unauthenticated instance of the Hue API
  const unauthenticatedApi = await hueApi.createLocal(bridge.ipaddress).connect();
  
  try {
    // Create a new user
    console.log('Press the link button on your Hue Bridge, then run this script within 30 seconds');
    
    const createdUser = await unauthenticatedApi.users.createUser(appName, deviceName);
    console.log('*******************************************************************************');
    console.log('Add these to your .env file:');
    console.log(`HUE_BRIDGE_IP=${bridge.ipaddress}`);
    console.log(`HUE_USER=${createdUser.username}`);
    console.log('*******************************************************************************');
    
    return createdUser.username;
  } catch (err) {
    if (err.getHueErrorType() === 101) {
      console.error('The Link button on the bridge was not pressed. Please press it and try again.');
    } else {
      console.error(`Unexpected Error: ${err.message}`);
    }
  }
}

// Run the script
discoverAndCreateUser(); 