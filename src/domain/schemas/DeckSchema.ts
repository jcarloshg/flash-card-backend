import { z } from 'zod';
import { CommonValidators } from './CommonSchemas';
import { QuestionSchema } from './QuestionSchema';

/**
 * Zod schema for Deck entity validation
 */
export const DeckSchema = z.object({
  id: CommonValidators.id,
  name: CommonValidators.text.short
    .max(100, 'Deck name cannot exceed 100 characters'),
  description: CommonValidators.text.medium.optional(),
  questions: z.array(QuestionSchema)
    .max(1000, 'Deck cannot exceed 1000 questions'),
});

/**
 * Schema for creating a new Deck
 */
export const CreateDeckSchema = z.object({
  id: CommonValidators.id,
  name: CommonValidators.text.short
    .max(100, 'Deck name cannot exceed 100 characters'),
  description: CommonValidators.text.medium.optional(),
  questions: z.array(z.string()).optional().default([]), // Question IDs for creation
});

/**
 * Schema for updating a Deck
 */
export const UpdateDeckSchema = z.object({
  name: CommonValidators.text.short
    .max(100, 'Deck name cannot exceed 100 characters')
    .optional(),
  description: CommonValidators.text.medium.optional(),
}).partial();

/**
 * Schema for adding a question to a deck
 */
export const AddQuestionToDeckSchema = z.object({
  questionId: CommonValidators.id,
});

/**
 * Type definitions derived from schemas
 */
export type DeckData = z.infer<typeof DeckSchema>;
export type CreateDeckData = z.infer<typeof CreateDeckSchema>;
export type UpdateDeckData = z.infer<typeof UpdateDeckSchema>;
export type AddQuestionToDeckData = z.infer<typeof AddQuestionToDeckSchema>;
