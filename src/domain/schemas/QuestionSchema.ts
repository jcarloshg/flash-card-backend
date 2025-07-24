import { z } from 'zod';
import { CommonValidators } from './CommonSchemas';

/**
 * Zod schema for Question entity validation
 */
export const QuestionSchema = z.object({
  id: CommonValidators.id,
  question: CommonValidators.text.medium,
  answer: CommonValidators.text.long,
});

/**
 * Schema for creating a new Question (without timestamps)
 */
export const CreateQuestionSchema = QuestionSchema.pick({
  id: true,
  question: true,
  answer: true,
});

/**
 * Schema for updating a Question
 */
export const UpdateQuestionSchema = QuestionSchema.partial().omit({
  id: true,
});

/**
 * Type definitions derived from schemas
 */
export type QuestionData = z.infer<typeof QuestionSchema>;
export type CreateQuestionData = z.infer<typeof CreateQuestionSchema>;
export type UpdateQuestionData = z.infer<typeof UpdateQuestionSchema>;
