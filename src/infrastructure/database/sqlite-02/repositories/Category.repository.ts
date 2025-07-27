import { Database } from "../Database";

import {
    CategoryType,
    CategoryToCreateType,
    CategoryToUpdateType,
} from "../../../../domain/entities/Category.entity";
import {
    CrudRepository,
    CreateRepository,
    ReadRepository,
    UpdateRepository,
    DeleteRepository,
} from "../../../../domain/repositories/crud.repository";

export class CreateCategory
    implements CreateRepository<CategoryToCreateType, CategoryType> {
    public run(entity: CategoryToCreateType): Promise<CategoryType> {
        throw new Error("Method not implemented.");
    }
}

export class ReadCategory implements ReadRepository<string, CategoryType> {
    public run(id: string): Promise<CategoryType | null> {
        throw new Error("Method not implemented.");
    }
}

export class UpdateCategory
    implements UpdateRepository<string, CategoryToUpdateType, CategoryType> {
    public run(id: string, entity: CategoryToUpdateType): Promise<CategoryType> {
        throw new Error("Method not implemented.");
    }
}

export class DeleteCategory implements DeleteRepository<string> {
    public run(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export class CategoryRespository implements CreateRepository<string, CategoryType, CategoryToCreateType, CategoryToUpdateType> {

}