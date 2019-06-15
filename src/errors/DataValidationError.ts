export class DataValidationError extends Error implements Error {
  public readonly status: number

  public readonly date: Date

  constructor(
    public readonly game: string,
    public readonly id: string,
    public readonly reason: string,
    public readonly validator: string
  ) {
    super(`[${game}] - ${id} ${reason} (${validator})`)

    Error.captureStackTrace(this, this.constructor)

    this.name = 'DataValidationError'

    this.status = 418

    this.date = new Date()
  }
}
