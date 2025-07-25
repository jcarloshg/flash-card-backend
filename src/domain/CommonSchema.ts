import { z } from 'zod';

/**
 * Common Zod schemas used across the domain layer.
 */
export const CommonSchema = {
  /**
   * UUID v4 validation schema
   */
  uuid: z.string().uuid(),

  /**
   * Email validation schema
   */
  email: z.string().email(),

  /**
   * Non-empty string schema
   */
  nonEmptyString: z.string().min(1, 'String must not be empty'),

  /**
   * Positive integer schema
   */
  positiveInt: z.number().int().positive(),
};

export type UUID = z.infer<typeof CommonSchema.uuid>;
export type Email = z.infer<typeof CommonSchema.email>;
export type NonEmptyString = z.infer<typeof CommonSchema.nonEmptyString>;
export type PositiveInt = z.infer<typeof CommonSchema.positiveInt>;
