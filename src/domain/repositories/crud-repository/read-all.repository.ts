export class ReadAllRepository<IdType, Entity> {
    public async run(id: IdType): Promise<Entity> {
        throw new Error("Method not implemented.");
    }
}
