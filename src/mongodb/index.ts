import * as Mongoose from 'mongoose'

class Database {
  private readonly DBURL: string =
    process.env.DB_ROOT_URL ||
    'mongodb://admin:xqiz8SMSwVH7T5v@ds223605.mlab.com:23605'
  private readonly DBNAME: string = process.env.DB_COLLECTION_NAME || 'phyx'

  constructor() {
    this._connect()
  }

  _connect(): void {
    Mongoose.connect(`${this.DBURL}/${this.DBNAME}`, { useNewUrlParser: true })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch((err: Error) => {
        console.error(`Database connection error: ${err}`)
      })
  }
}

const DATABASE: Database = new Database()

export { DATABASE }
