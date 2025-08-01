import { z } from "zod";
import { CommonSchema } from "./common-schema";
import { CategorySchema } from "./Category.entity";

/**
 * Zod schema for Deck entity
 * Validates all required fields and types
 * - uuid: required, UUID v4
 * - name: required, non-empty string
 * - description: required, non-empty string
 * - category: required, Category entity
 * - createdAt: required, valid Date
 * - updatedAt: required, valid Date
 */
export const DeckSchema = z.object({
    uuid: CommonSchema.uuid,
    name: CommonSchema.nonEmptyString,
    description: CommonSchema.nonEmptyString,
    category: CategorySchema,
    createdAt: CommonSchema.createdAt,
    updatedAt: CommonSchema.updatedAt,
});

/**
 * Zod schema for creating a Deck
 * Only name, description, and category are required
 * Does NOT include uuid, createdAt, updatedAt
 */
export const DeckToCreate = DeckSchema.pick({
    name: true,
    description: true,
}).extend({
    category_uuid: CommonSchema.uuid,
});

/**
 * Zod schema for updating a Deck
 * All fields are optional except createdAt and updatedAt (not included)
 * Adds uuid as optional field
 */
export const DeckToUpdate = DeckSchema.omit({
    createdAt: true,
    updatedAt: true,
    category: true, // category is not updated directly, use category_uuid instead
})
    .partial()
    .extend({
        category_uuid: CommonSchema.uuid,
        uuid: CommonSchema.uuid.optional(),
    });

/**
 * Type inference for Deck schemas
 */
export type DeckType = z.infer<typeof DeckSchema>;
export type DeckToCreateType = z.infer<typeof DeckToCreate>;
export type DeckToUpdateType = z.infer<typeof DeckToUpdate>;
