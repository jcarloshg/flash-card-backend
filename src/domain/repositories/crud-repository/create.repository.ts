/**
 * Abstract class for creating entities in a repository.
 * @template DataToCreate - The data required to create the entity.
 * @template EntityCreated - The entity type that is created.
 */
export abstract class CreateRepository<DataToCreate, EntityCreated> {
    /**
     * Creates a new entity in the repository.
     * @param entity - The data required to create the entity.
     * @returns The created entity.
     */
    public abstract run(entity: DataToCreate): Promise<EntityCreated>;
}
