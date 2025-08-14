export class ReadByIdRepository<EntityIdType, Entity> {
    async run(id: EntityIdType): Promise<Entity | null> {
        throw new Error("Method not implemented.");
    }
}