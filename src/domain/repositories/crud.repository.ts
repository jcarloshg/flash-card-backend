export class CreateRepository<T> {
    public async run(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
}

export class ReadRepository<T> {
    public async run(id: string): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
}

export class UpdateRepository<T> {
    public async run(id: string, entity: T): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
}

export class DeleteRepository<T> {
    public async run(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

/**
 * Abstract CRUD repository for managing entities of type T.
 *
 * @template T Entity type
 */
export abstract class CrudRepository<T> {
    public abstract readonly create: CreateRepository<T>;
    public abstract readonly read: ReadRepository<T>;
    public abstract readonly update: UpdateRepository<T>;
    public abstract readonly delete: DeleteRepository<T>;

    public async runCreate(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }

    public async runRead(id: string): Promise<T | null> {
        throw new Error("Method not implemented.");
    }

    public async runUpdate(id: string, entity: T): Promise<T | null> {
        throw new Error("Method not implemented.");
    }

    public async runDelete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
