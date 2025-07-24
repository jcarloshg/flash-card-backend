import { Request, Response, NextFunction } from 'express';

// Error logging middleware
export const errorLogger = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  next(error);
};

// Global error handler
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
    timestamp: new Date().toISOString()
  });
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response): Response => {
  return res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.url} not found`,
    timestamp: new Date().toISOString()
  });
};

// Request logger middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};
