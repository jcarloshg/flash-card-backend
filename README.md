# Express TypeScript Project

A simple Express.js server built with TypeScript that provides a clean starting point for building web APIs.

## Features

- ✅ Express.js web framework
- ✅ TypeScript for type safety
- ✅ Hot reload with nodemon
- ✅ Built-in health check endpoint
- ✅ JSON request/response handling
- ✅ Proper TypeScript configuration
- ✅ Development and production scripts

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the development server with hot reload:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

## Production

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Remove dist folder

## API Endpoints

### GET /
Returns a welcome message with timestamp.

**Response:**
```json
{
  "message": "Hello World! Express + TypeScript server is running!",
  "timestamp": "2025-07-24T10:00:00.000Z"
}
```

### GET /health
Health check endpoint that returns server status.

**Response:**
```json
{
  "status": "OK",
  "uptime": 123.456,
  "timestamp": "2025-07-24T10:00:00.000Z"
}
```

## Project Structure

```
├── src/
│   └── index.ts          # Main server file
├── dist/                 # Compiled JavaScript (after build)
├── .github/
│   └── copilot-instructions.md
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

- `PORT` - Server port (default: 3000)

## TypeScript Configuration

The project uses a strict TypeScript configuration with:
- Target: ES2020
- Module: CommonJS
- Source maps enabled
- Declaration files generated
- Strict type checking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (when available)
5. Submit a pull request
