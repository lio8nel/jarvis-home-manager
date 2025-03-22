# Home Automation Project

A full-stack application built with Next.js and Express.js, designed to provide a modern web interface for home automation control.

## Project Overview

This monorepo project consists of two main packages:
- A Next.js web application with TypeScript and Tailwind CSS
- An Express.js API server with Node Hue API integration

## Prerequisites

- Node.js (v14 or higher recommended)
- npm
- Philips Hue Bridge (for API functionality), configured for API access

## Installation & configuration

Clone the repository and install dependencies by running `npm install` at the project's root.

Create a _.env_ file in _packages/api/_ with the following information:

```env
PORT=3001
HUE_BRIDGE_IP=<your_bridge_ip>
HUE_USER=<your_hue_user>
```

## npm scripts

```
# start the dev server for the frontend app
npm run "web:dev"
# start the API server
npm run "api:dev"

# run tests for frontend and API respsectively
npm run "web:test"
npm run "api:test"
```
