export type ServiceErrorBodyType = {
  code: string
  message: string
  stackTrace: string
}
export class ServiceError extends Error {
  readonly url: string
  readonly status: number
  readonly statusText: string
  readonly data: ServiceErrorBodyType

  constructor(params: {
    url: string
    status: number
    statusText: string
    data: ServiceErrorBodyType
  }) {
    super()
    this.name = 'ServiceError'
    this.url = params.url
    this.status = params.status
    this.statusText = params.statusText
    this.data = params.data
  }
}
