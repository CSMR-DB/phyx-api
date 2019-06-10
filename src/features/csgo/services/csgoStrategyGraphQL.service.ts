import { Document } from 'mongoose'
import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'

export const csgoStrategyGraphQLService: {
  [key: string]: (args?: any) => Promise<any>
} = {
  csgoStrategy: async ({ id }: { id: string }): Promise<Document | null> =>
    await MongooseModelCSGOStrategy.findOne({ id })
      .exec()
      .then((doc: Document | null) => doc)
      .catch((error: Error) => {
        throw error
      }),

  csgoStrategies: async (): Promise<Document[]> =>
    await MongooseModelCSGOStrategy.find({})
      .exec()
      .then((docs: Document[]) => docs)
      .catch((error: Error) => {
        throw error
      }),

  csgoStrategiesByMap: async ({ map }: { map: string }): Promise<Document[]> =>
    await MongooseModelCSGOStrategy.find({ map })
      .exec()
      .then((docs: Document[]) => docs)
      .catch((error: Error) => {
        throw error
      })
}
