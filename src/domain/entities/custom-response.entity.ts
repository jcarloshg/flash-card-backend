export class CustomResponse<T> {
  public readonly data: T;
  public readonly statusCode: number;
  public readonly messageUser: string;
  public readonly messageDeveloper?: string;

  private constructor(
    data: T,
    code: number,
    messageUser: string,
    messageDeveloper: string
  ) {
    this.data = data;
    this.statusCode = code;
    this.messageUser = messageUser;
    this.messageDeveloper = messageDeveloper;
  }
}
