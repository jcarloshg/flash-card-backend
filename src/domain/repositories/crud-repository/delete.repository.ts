/**
 * Abstract repository for deleting entities by ID.
 * @template IdType - The type of the entity identifier.
 */
export abstract class DeleteRepository<IdType> {
    /**
     * Deletes an entity by its ID.
     * @param id - The identifier of the entity to delete.
     * @returns A promise that resolves to true if deletion was successful, false otherwise.
     */
    public abstract run(id: IdType): Promise<boolean>;
}
