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
export const UserToCreateSchema = z.object({
  userName: CommonSchema.nonEmptyString,
  email: CommonSchema.email,
  pass: CommonSchema.password,
});

export type UserToCreate = z.infer<typeof UserToCreateSchema>;

/**
 * Schema for updating a user (all fields optional except id)
 */
export const UserToUpdateSchema = z.object({
  id: CommonSchema.uuid,
  userName: CommonSchema.nonEmptyString.optional(),
  email: CommonSchema.email.optional(),
  pass: CommonSchema.password.optional(),
  updatedAt: CommonSchema.updatedAt.optional(),
});

export type UserToUpdate = z.infer<typeof UserToUpdateSchema>;

export type User = z.infer<typeof UserSchema>;
