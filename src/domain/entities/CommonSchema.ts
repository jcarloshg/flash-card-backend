import { z } from 'zod';

/**
 * Common reusable Zod schemas for validation
 */
export const CommonSchema = {
    uuid: z.string().regex(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
        'Invalid UUID format'
    ),
    email: z.string().regex(
        /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format'
    ),
    nonEmptyString: z.string().min(1, 'Field is required'),
    password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
    createdAt: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), {
        message: 'createdAt must be a valid Date object',
    }),
    updatedAt: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), {
        message: 'updatedAt must be a valid Date object',
    }),
};
