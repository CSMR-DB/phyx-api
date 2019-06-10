import { Document } from 'mongoose'
import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'

export interface IcsgoStrategyGraphQLService<T> {
  csgoStrategy: ({ id }: { id: string }) => Promise<T | null | undefined>
  csgoStrategies: () => Promise<T[]>
  csgoStrategiesByMap: ({ map }: { map: string }) => Promise<T[]>
}

export type csgoStrategyGraphQLServiceContext = {
  csgoStrategyGraphQLService: IcsgoStrategyGraphQLService<Document>
}

export const csgoStrategyGraphQLService: IcsgoStrategyGraphQLService<
  Document
> = {
  csgoStrategy: async ({
    id
  }: {
    id: string
  }): Promise<Document | null | undefined> =>
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
