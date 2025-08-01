import { z } from "zod";
import { CommonSchema } from "./common-schema";
import { CategorySchema } from "./Category.entity";

/**
 * Deck entity schema.
 * @description Validates Deck entity fields.
 * @property {string} uuid - Deck UUID (v4).
 * @property {string} name - Deck name (non-empty).
 * @property {string} description - Deck description (non-empty).
 * @property {CategoryType} category - Deck category entity.
 * @property {Date} createdAt - Creation date.
 * @property {Date} updatedAt - Last update date.
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
 * Schema for creating a Deck.
 * @description Requires name, description, and category_uuid.
 * @property {string} name - Deck name.
 * @property {string} description - Deck description.
 * @property {string} category_uuid - UUID of the category.
 */
export const DeckToCreate = DeckSchema.pick({
    name: true,
    description: true,
}).extend({
    category_uuid: CommonSchema.uuid,
});

/**
 * Schema for updating a Deck.
 * @description All fields optional except createdAt/updatedAt. Use category_uuid for category updates.
 * @property {string} [name] - Deck name.
 * @property {string} [description] - Deck description.
 * @property {string} [category_uuid] - UUID of the category.
 * @property {string} [uuid] - Deck UUID.
 */
export const DeckToUpdate = DeckSchema.omit({
    createdAt: true,
    updatedAt: true,
    category: true,
})
    .partial()
    .extend({
        category_uuid: CommonSchema.uuid,
        uuid: CommonSchema.uuid.optional(),
    });

/**
 * Deck entity type.
 */
export type DeckType = z.infer<typeof DeckSchema>;

/**
 * Deck creation type.
 */
export type DeckToCreateType = z.infer<typeof DeckToCreate>;

/**
 * Deck update type.
 */
export type DeckToUpdateType = z.infer<typeof DeckToUpdate>;
