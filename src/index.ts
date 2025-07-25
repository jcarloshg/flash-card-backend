import express from 'express';

import {
  errorHandler,
  errorLogger,
  notFoundHandler,
  requestLogger
} from './presentation/middleware/errorMiddleware';
import { enviromentVariables } from './shared/config/enviroment-variables';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     environment: enviromentVariables.nodeEnv,
//     version: process.env.npm_package_version || '1.0.0'
//   });
// });

// // Basic route
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Welcome to the DDD Express.js API!',
//     timestamp: new Date().toISOString(),
//     documentation: '/docs',
//     health: '/health'
//   });
// });

// Category CRUD routes
import categoryRouter from './presentation/controllers/CategoryController';
app.use('/api/v1/categories', categoryRouter);

// Error handling middleware (must be last)
app.use(errorLogger);
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = enviromentVariables.port;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📖 Environment: ${enviromentVariables.nodeEnv}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;
