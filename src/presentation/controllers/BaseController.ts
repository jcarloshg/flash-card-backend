import { Request, Response, NextFunction } from 'express';

// Base Controller class
export abstract class BaseController {
  protected success<T>(res: Response, data: T, statusCode: number = 200): Response {
    return res.status(statusCode).json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  }

  protected error(res: Response, message: string, statusCode: number = 400): Response {
    return res.status(statusCode).json({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    });
  }

  protected serverError(res: Response, error: Error): Response {
    console.error('Server Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      timestamp: new Date().toISOString()
    });
  }
}

// Controller method decorator for error handling
export function handleErrors(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;

  descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
    try {
      await method.apply(this, [req, res, next]);
    } catch (error) {
      console.error(`Error in ${target.constructor.name}.${propertyName}:`, error);
      
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
      
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        timestamp: new Date().toISOString()
      });
    }
  };
}
