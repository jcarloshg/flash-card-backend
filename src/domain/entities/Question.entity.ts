import { z } from 'zod';
import { CommonSchema } from './common-schema';


/**
 * Question Entity Schemas
 *
 * Implements Zod schemas for Question entity following project conventions.
 *
 * - questionSchemaToCreate: for creation (no uuid, active, createdAt, updatedAt)
 * - questionSchemaToCreateToRepository: for repository creation (with uuid, active, createdAt, updatedAt)
 * - questionSchema: full entity (all fields)
 * - questionSchemaToRepository: for repository (with uuid, active, createdAt, updatedAt)
 * - questionSchemaToUpdate: for updates (all fields optional)
 */

export const questionSchema = z.object({
    uuid: CommonSchema.uuid,
    active: CommonSchema.active,
    createdAt: CommonSchema.createdAt,
    updatedAt: CommonSchema.updatedAt,
    question: z.string().min(1, 'Question is required'),
    answers: z.string().min(1, 'Answers are required'),
    answers_type: z.enum([
        'text/plain',
        'text/csv',
        'text/x-code',
        'image/png',
        'image/jpeg',
    ]),
});

export const questionSchemaToCreate = questionSchema.omit({
    uuid: true,
    active: true,
    createdAt: true,
    updatedAt: true,
});

export const questionSchemaToCreateToRepository = questionSchema.pick({
    uuid: true,
    active: true,
    createdAt: true,
    updatedAt: true,
    question: true,
    answers: true,
    answers_type: true,
});

export const questionSchemaToRepository = questionSchema.pick({
    uuid: true,
    active: true,
    createdAt: true,
    updatedAt: true,
    question: true,
    answers: true,
    answers_type: true,
});

export const questionSchemaToUpdate = questionSchema.partial();


/**
 * Type inference for Question entity and schemas
 */
export type Question = z.infer<typeof questionSchema>;
export type QuestionToRepository = z.infer<typeof questionSchemaToRepository>;
export type QuestionCreate = z.infer<typeof questionSchemaToCreate>;
export type QuestionCreateToRepository = z.infer<typeof questionSchemaToCreateToRepository>;
export type QuestionUpdate = z.infer<typeof questionSchemaToUpdate>;
