import { z } from "zod";
import { CommonSchema } from "./CommonSchema";

/**
 * Zod schema for Category entity
 * Validates all required fields and types
 * - uuid: required, UUID v4
 * - name: required, non-empty string
 * - description: required, non-empty string
 * - createdAt: required, valid Date
 * - updatedAt: required, valid Date
 */
export const CategorySchema = z.object({
    uuid: CommonSchema.uuid,
    name: CommonSchema.nonEmptyString,
    description: CommonSchema.nonEmptyString,
    createdAt: CommonSchema.createdAt,
    updatedAt: CommonSchema.updatedAt,
});

/**
 * Zod schema for creating a Category
 * Only name and description are required
 * Does NOT include uuid, createdAt, updatedAt
 */
export const CategoryToCreate = CategorySchema.pick({
    name: true,
    description: true,
});

/**
 * Zod schema for updating a Category
 * All fields are optional except createdAt and updatedAt (not included)
 * Adds uuid as optional field
 */
export const CategoryToUpdate = CategorySchema.omit({
    createdAt: true,
    updatedAt: true,
})
    .partial()
    .extend({
        uuid: CommonSchema.uuid.optional(),
    });

/**
 * Type inference for Category schemas
 */
export type CategoryType = z.infer<typeof CategorySchema>;
export type CategoryToCreateType = z.infer<typeof CategoryToCreate>;
export type CategoryToUpdateType = z.infer<typeof CategoryToUpdate>;
