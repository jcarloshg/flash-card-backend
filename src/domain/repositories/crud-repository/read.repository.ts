/**
 * Abstract repository for reading a single entity by its identifier.
 * @template IdType - The type of the entity identifier.
 * @template Entity - The type of the entity.
 */
export abstract class ReadRepository<IdType, Entity> {
    /**
     * Retrieves an entity by its identifier.
     * @param id - The identifier of the entity.
     * @returns A promise resolving to the entity or null if not found.
     */
    public abstract run(id: IdType): Promise<Entity | null>;
}
