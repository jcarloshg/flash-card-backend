/**
 * Abstract class for update repository operations.
 * @template IdType - Type of the entity identifier.
 * @template DataToUpdate - Type of the data to update.
 * @template EntityUpdated - Type of the updated entity.
 */
export abstract class UpdateRepository<IdType, DataToUpdate, EntityUpdated> {
    /**
     * Updates an entity by its identifier.
     * @param id - The identifier of the entity to update.
     * @param entity - The data to update the entity with.
     * @returns The updated entity or null if not found.
     */
    public abstract run(
        id: IdType,
        entity: DataToUpdate
    ): Promise<EntityUpdated | null>;
}
