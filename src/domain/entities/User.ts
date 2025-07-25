import { z } from 'zod';
import { CommonSchema } from './CommonSchema';

/**
 * User domain model schema using Zod
 */
export const UserSchema = z.object({
    id: CommonSchema.uuid,
    userName: CommonSchema.nonEmptyString,
    email: CommonSchema.email,
    pass: CommonSchema.password,
    createdAt: CommonSchema.createdAt,
    updatedAt: CommonSchema.updatedAt,
});


/**
 * Schema for creating a new user (no id, createdAt, updatedAt)
 */
export const UserToCreateSchema = UserSchema.pick({
    userName: true,
    email: true,
    pass: true,
});
export type UserToCreate = z.infer<typeof UserToCreateSchema>;

/**
 * Schema for updating a user (all fields optional)
 */
export const UserToUpdateSchema = UserSchema.partial();
export type UserToUpdate = z.infer<typeof UserToUpdateSchema>;
