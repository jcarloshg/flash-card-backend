import { Request, Response, NextFunction } from 'express';

/**
 * Abstract BaseController for consistent API responses and error handling
 */
export abstract class BaseController {
  /**
   * Send a success response
   * @param res Express Response object
   * @param data Response data
   * @param statusCode HTTP status code (default: 200)
   */
  public success<T>(res: Response, data: T, statusCode: number = 200): Response {
    return res.status(statusCode).json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Send a client error response
   * @param res Express Response object
   * @param message Error message
   * @param statusCode HTTP status code (default: 400)
   */
  public error(res: Response, message: string, statusCode: number = 400): Response {
    return res.status(statusCode).json({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Send a server error response
   * @param res Express Response object
   * @param error Error object
   */
  public serverError(res: Response, error: Error): Response {
    // Log error with timestamp
    console.error(`[${new Date().toISOString()}] Server Error:`, error);
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Decorator for controller methods to handle errors and pass to Express error middleware
 */
export function handleErrors(
  target: unknown,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
    try {
      await method.apply(this, [req, res, next]);
    } catch (error) {
      const className = (target as { constructor: { name: string } }).constructor?.name || 'UnknownClass';
      console.error(`Error in ${className}.${propertyName}:`, error);
      if (error instanceof Error) {
        res.status(500).json({
          success: false,
          error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error',
          timestamp: new Date().toISOString()
        });
      }
      next(error);
    }
  };
}
