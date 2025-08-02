import { z } from "zod";
import { CommonSchema } from "./common-schema";

export const CategorySchema = z.object({
    uuid: CommonSchema.uuid,
    active: CommonSchema.active,
    name: CommonSchema.nonEmptyString,
    description: CommonSchema.nonEmptyString,
    createdAt: CommonSchema.createdAt,
    updatedAt: CommonSchema.updatedAt,
});

export const CategorySchemaToRepository = CategorySchema;

export const CategorySchemaToCreate = CategorySchema.pick({
    name: true,
    description: true,
});

export const CategorySchemaToCreateToRepository = CategorySchema.pick({
    uuid: true,
    name: true,
    description: true,
    active: true,
    createdAt: true,
    updatedAt: true,
});

export const CategoryToUpdate = CategorySchema.omit({
    createdAt: true,
    updatedAt: true,
})
    .partial()
    .extend({
        uuid: CommonSchema.uuid.optional(),
    });

// CREATE
export type CategoryToCreate = z.infer<typeof CategorySchemaToCreate>;
export type CategoryToCreateToRepository = z.infer<typeof CategorySchemaToCreateToRepository>;

// READ
export type Category = z.infer<typeof CategorySchema>;
export type CategoryRepository = z.infer<typeof CategorySchemaToRepository>;

// UPDATE
export type CategoryToUpdateType = z.infer<typeof CategoryToUpdate>;

// DELETE


