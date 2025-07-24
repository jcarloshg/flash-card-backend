import { z } from 'zod';
import { ValidationError } from '../../shared/errors/CustomErrors';

/**
 * Utility class for handling Zod validation in the domain layer
 */
export class DomainValidator {
  /**
   * Validates data against a Zod schema and throws ValidationError on failure
   * @param schema - The Zod schema to validate against
   * @param data - The data to validate
   * @param entityName - Optional entity name for better error messages
   * @returns The validated and parsed data
   * @throws {ValidationError} When validation fails
   */
  static validate<T>(schema: z.ZodSchema<T>, data: unknown, entityName?: string): T {
    const result = schema.safeParse(data);
    
    if (!result.success) {
      const firstError = result.error.issues[0];
      const fieldPath = firstError.path.join('.');
      const message = entityName 
        ? `${entityName} validation failed: ${firstError.message}`
        : firstError.message;
      
      throw new ValidationError(message, fieldPath || undefined);
    }
    
    return result.data;
  }

  /**
   * Validates data and returns a result object instead of throwing
   * @param schema - The Zod schema to validate against
   * @param data - The data to validate
   * @returns Result object with success/error information
   */
  static validateSafe<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    error?: {
      message: string;
      field?: string;
    };
  } {
    const result = schema.safeParse(data);
    
    if (!result.success) {
      const firstError = result.error.issues[0];
      return {
        success: false,
        error: {
          message: firstError.message,
          field: firstError.path.join('.') || undefined,
        },
      };
    }
    
    return {
      success: true,
      data: result.data,
    };
  }
}
