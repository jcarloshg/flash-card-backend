import { z } from 'zod';
import { CommonSchema } from './common-schema';

/**
 * Question Entity
 * Represents a question with possible answers and answer type.
 */
/**
 * Schema for Question Entity
 * @see Question
 */
export const QuestionSchema = z.object({
    uuid: CommonSchema.uuid,
    createdAt: CommonSchema.createdAt,
    updatedAt: CommonSchema.updatedAt,
    question: z.string("Must be a string").min(1, 'Question is required'),
    answers: z.string("Must be a string").min(1, 'Answers are required'),
    answers_type: z.enum([
        'text/plain',
        'text/csv',
        'text/x-code',
        'image/png',
        'image/jpeg',
    ]),
});

/**
 * Schema for creating a Question (without uuid, createdAt, updatedAt)
 */
export const QuestionToCreate = QuestionSchema.pick({
    question: true,
    answers: true,
    answers_type: true,
});

/**
 * Schema for updating a Question (all fields optional except uuid)
 */
export const QuestionToUpdate = QuestionSchema.omit({
    createdAt: true,
    updatedAt: true,
}).partial().extend({ uuid: CommonSchema.uuid });

/**
 * Type inference for Question entity
 */
export type Question = z.infer<typeof QuestionSchema>;
export type QuestionCreate = z.infer<typeof QuestionToCreate>;
export type QuestionUpdate = z.infer<typeof QuestionToUpdate>;
