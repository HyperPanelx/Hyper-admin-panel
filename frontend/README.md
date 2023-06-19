# Vue js 3 Minimal Starter

Look at the [Vue 3 documentation](https://vuejs.org/) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```
#### Then you need to create a .env.production file name (for building project) and .env.development file name (for developing project) file in root of the project and add these keys and your values

```
API_BASE=xxx   // url of proxy server ( in development phase enter: http://localhost:9001/api )
COOKIE_NAME=x_hyper_x
API_KEY=b3c7532e3158eea90c6fb542fb69cda06c6280cdc0d0f39d51bf78bae425e8514d8b6c7549ae26d86
VERSION=1.0.0
```
#### for running in localhost you need to download the entire proxy server folder in this repository and follow the README.md instruction there.

## Development Server

Start the development server on `http://localhost:9000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```
