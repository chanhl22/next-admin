export class ServiceError extends Error {
  code?: string;
  status: number;

  constructor(message: string, code?: string, status: number = 500) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.status = status;
  }
}