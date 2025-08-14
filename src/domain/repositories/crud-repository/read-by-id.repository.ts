/**
 * Abstract repository for reading an entity by its ID.
 * @template EntityIdType - The type of the entity ID.
 * @template Entity - The entity type.
 */
export abstract class ReadByIdRepository<EntityIdType, Entity> {
    /**
     * Retrieves an entity by its ID.
     * @param id - The ID of the entity.
     * @returns The entity if found, otherwise null.
     */
    abstract run(id: EntityIdType): Promise<Entity | null>;
}