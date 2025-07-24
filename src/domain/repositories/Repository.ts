// Base Repository interface with common CRUD operations
export interface Repository<TEntity, TId> {
  findById(id: TId): Promise<TEntity | null>;
  findAll(): Promise<TEntity[]>;
  save(entity: TEntity): Promise<TEntity>;
  update(entity: TEntity): Promise<TEntity>;
  delete(id: TId): Promise<void>;
  exists(id: TId): Promise<boolean>;
}

// Specification pattern for complex queries
export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean;
}

// Repository with specification support
export interface SpecificationRepository<TEntity, TId> extends Repository<TEntity, TId> {
  findBySpecification(spec: Specification<TEntity>): Promise<TEntity[]>;
  findOneBySpecification(spec: Specification<TEntity>): Promise<TEntity | null>;
}
