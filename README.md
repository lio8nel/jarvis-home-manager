# Home Automation Project

A full-stack application built with Next.js and Express.js, designed to provide a modern web interface for home automation control.

[![Build and Test](https://github.com/lio8nel/jarvis-home-manager/actions/workflows/build.yml/badge.svg)](https://github.com/lio8nel/jarvis-home-manager/actions/workflows/build.yml)

## Project Overview

This monorepo project consists of two main packages:
- A Next.js web application with TypeScript and Tailwind CSS
- An Express.js API server with Node Hue API integration

## Prerequisites

- Node.js (v14 or higher recommended)
- npm
- Philips Hue Bridge (for API functionality), configured for API access

## Developping locally

### Clone & configure

Clone the repository and install dependencies by running `npm install` at the project's root.

Create a _.env_ file with the following information:

```env
PORT=3001
HUE_BRIDGE_IP=<your_bridge_ip>
HUE_USER=<your_hue_user>
API_HOST=localhost
```

### npm scripts

```bash
# start the dev server for the frontend app
npm run "web:dev"
# start the API server
npm run "api:dev"

# run tests for frontend and API respsectively
npm run "web:test"
npm run "api:test"
```

## Docker

Images are available here:
  * https://hub.docker.com/r/lionel38190/jarvisapi (API endpoint)
  * https://hub.docker.com/r/lionel38190/jarvisweb (UI / Webapp)

### Build & run

```bash
# build your images locally
docker-compose build
# run the app
docker-compose up 
```

### Run remote images

```bash
export TAG_VERSION=xyz
docker-compose up # will use tag :xyz
```