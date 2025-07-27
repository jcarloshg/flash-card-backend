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
    public async run(
        id: IdType,
        entity: DataToUpdate
    ): Promise<EntityUpdated | null> {
        throw new Error("Method not implemented.");
    }
}

export class DeleteRepository<IdType> {
    public async run(id: IdType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
