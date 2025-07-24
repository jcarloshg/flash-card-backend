import { z } from 'zod';

/**
 * Common validation schemas used across domain entities
 */

// Common field validators
export const CommonValidators = {
  id: z.string()
    .min(1, 'ID cannot be empty')
    .max(100, 'ID cannot exceed 100 characters'),
  
  text: {
    short: z.string()
      .min(1, 'Text cannot be empty')
      .max(255, 'Text cannot exceed 255 characters')
      .trim(),
    
    medium: z.string()
      .min(1, 'Text cannot be empty')
      .max(1000, 'Text cannot exceed 1000 characters')
      .trim(),
    
    long: z.string()
      .min(1, 'Text cannot be empty')
      .max(2000, 'Text cannot exceed 2000 characters')
      .trim(),
  },
  
  timestamp: z.date(),
  
  email: z.string()
    .email('Invalid email format')
    .max(320, 'Email cannot exceed 320 characters'),
  
  url: z.string()
    .url('Invalid URL format')
    .max(2048, 'URL cannot exceed 2048 characters'),
};

/**
 * Base entity schema with common fields
 */
export const BaseEntitySchema = z.object({
  id: CommonValidators.id,
  createdAt: CommonValidators.timestamp,
  updatedAt: CommonValidators.timestamp,
});
