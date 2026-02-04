export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}