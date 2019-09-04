import { connect } from 'mongoose'

require('dotenv').config()

class Database {
  private readonly DBURL: string | undefined = process.env.DB_ROOT_URL || 'mongodb://localhost:27017'
  private readonly DBNAME: string | undefined = process.env.DB_COLLECTION_NAME || 'phyx_api'

  constructor() {
    this._connect()
  }

  _connect(): void {
    connect(
      `${this.DBURL}/${this.DBNAME}`,
      { useNewUrlParser: true, useCreateIndex: true }
    )
      .then(() => {
        console.log('Database connection successful')
      })
      .catch((err: Error) => {
        console.error(`Database connection error: ${err}`)
      })
  }
}

export const DATABASE: Database = new Database()
