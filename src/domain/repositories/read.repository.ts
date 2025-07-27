export class ReadRepository<IdType, Entity> {
    public async run(id: IdType): Promise<Entity | null> {
        throw new Error("Method not implemented.");
    }
}
