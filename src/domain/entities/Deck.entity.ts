import { z } from "zod";
import { CommonSchema } from "./common-schema";
import { CategorySchema } from "./Category.entity";

export const DeckSchema = z.object({
    uuid: CommonSchema.uuid,
    name: CommonSchema.nonEmptyString,
    description: CommonSchema.nonEmptyString,
    category: CategorySchema,
    createdAt: CommonSchema.createdAt,
    updatedAt: CommonSchema.updatedAt,
    active: CommonSchema.active,
});

export const DeckSchemaToRepository = DeckSchema.omit({
    category: true,
})
    .extend({
        category_uuid: CommonSchema.uuid,
        active: CommonSchema.active,
    });

export const DeckSchemaToCreate = DeckSchema.pick({
    name: true,
    description: true,
})
    .extend({
        category_uuid: CommonSchema.uuid,
    });

export const DeckSchemaToCreateToRespository = DeckSchema.pick({
    uuid: true,
    name: true,
    description: true,
    createdAt: true,
    updatedAt: true,
})
    .extend({
        category_uuid: CommonSchema.uuid,
        active: CommonSchema.active,
    });

export const DeckToUpdate = DeckSchema.omit({
    createdAt: true,
    updatedAt: true,
    category: true,
})
    .partial()
    .extend({
        category_uuid: CommonSchema.uuid,
        uuid: CommonSchema.uuid.optional(),
        active: CommonSchema.active.optional(),
    });

// CREATE
export type DeckToCreate = z.infer<typeof DeckSchemaToCreate>;
export type DeckToCreateToRespository = z.infer<typeof DeckSchemaToCreateToRespository>;

// READ
export type DeckType = z.infer<typeof DeckSchema>;
export type DeckToRepositoryType = z.infer<typeof DeckSchemaToRepository>;

// UPDATE
export type DeckToUpdateType = z.infer<typeof DeckToUpdate>;

// DELETE
