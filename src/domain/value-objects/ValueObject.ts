// Base Value Object class
export abstract class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this.validate(value);
    this._value = Object.freeze(value);
  }

  get value(): T {
    return this._value;
  }

  protected abstract validate(value: T): void;

  public equals(other: ValueObject<T>): boolean {
    if (this === other) return true;
    if (!(other instanceof ValueObject)) return false;
    return JSON.stringify(this._value) === JSON.stringify(other._value);
  }

  public toString(): string {
    return String(this._value);
  }
}
