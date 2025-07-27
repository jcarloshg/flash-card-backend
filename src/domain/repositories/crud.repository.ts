export class CreateRepository<DataToCreate, EntityCreated> {
    public async run(entity: DataToCreate): Promise<EntityCreated> {
        throw new Error("Method not implemented.");
    }
}

export class ReadRepository<IdType, Entity> {
    public async run(id: IdType): Promise<Entity | null> {
        throw new Error("Method not implemented.");
    }
}

export class UpdateRepository<IdType, DataToUpdate, EntityUpdated> {
    public async run(id: IdType, entity: DataToUpdate): Promise<EntityUpdated | null> {
        throw new Error("Method not implemented.");
    }
}

export class DeleteRepository<IdType> {
    public async run(id: IdType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

/**
 * A generic CRUD (Create, Read, Update, Delete) repository class that delegates operations
 * to specialized repository interfaces for each operation.
 *
 * @typeParam IdType - The type used for the entity's unique identifier.
 * @typeParam Entity - The type representing the entity managed by the repository.
 * @typeParam DataToCreate - The type of data required to create a new entity.
 * @typeParam DataToUpdate - The type of data required to update an existing entity.
 */
export class CrudRepository<IdType, Entity, DataToCreate, DataToUpdate> {
    private readonly create: CreateRepository<DataToCreate, Entity>;
    private readonly read: ReadRepository<IdType, Entity>;
    private readonly update: UpdateRepository<IdType, DataToUpdate, Entity>;
    private readonly deleteRepo: DeleteRepository<IdType>;

    constructor(
        create: CreateRepository<DataToCreate, Entity>,
        read: ReadRepository<IdType, Entity>,
        update: UpdateRepository<IdType, DataToUpdate, Entity>,
        deleteRepo: DeleteRepository<IdType>
    ) {
        this.create = create;
        this.read = read;
        this.update = update;
        this.deleteRepo = deleteRepo;
    }

    public async runCreate(entity: DataToCreate): Promise<Entity> {
        return this.create.run(entity);
    }

    public async runRead(id: IdType): Promise<Entity | null> {
        return this.read.run(id);
    }

    public async runUpdate(id: IdType, entity: DataToUpdate): Promise<Entity | null> {
        return this.update.run(id, entity);
    }

    public async runDelete(id: IdType): Promise<boolean> {
        return this.deleteRepo.run(id);
    }
}
