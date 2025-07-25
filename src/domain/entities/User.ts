/**
 * User Entity
 * @module domain/entities/User
 */
export interface IUserProps {
  id: string;
  name: string;
  email: string;
}

/**
 * Represents a User in the domain.
 */
export class User {
  public readonly id: string;
  public name: string;
  public email: string;

  constructor(props: IUserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }
}
