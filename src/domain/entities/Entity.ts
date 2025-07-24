// Base Entity class with common properties
export abstract class Entity<T> {
  protected readonly _id: T;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  constructor(id: T) {
    this._id = id;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): T {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected touch(): void {
    this._updatedAt = new Date();
  }

  public equals(other: Entity<T>): boolean {
    if (this === other) return true;
    if (!(other instanceof Entity)) return false;
    return this._id === other._id;
  }
}
