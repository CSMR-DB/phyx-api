import mongoose, { Document } from 'mongoose'
import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'
import { ICSGOStrategyDocument } from '../interfaces/ICSGOStrategyDocument.interface'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { csgoStrategyValidator } from '../validators/preset/csgoStrategyValidator'
import { MongoError } from 'mongodb'

export interface IcsgoStrategyGraphQLService<T> {
  Query: {
    csgoStrategy: ({ id }: { id: string }) => Promise<T | null | undefined>
    csgoStrategies: () => Promise<T[]>
    csgoStrategiesByMap: ({ map }: { map: string }) => Promise<T[]>
  }
  Mutation: {
    submitCSGOStrategy: ({
      strategy
    }: {
      strategy: ICSGOStrategyDocument.Strategy
    }) => Promise<{ result: boolean; errors: string[] }>
  }
}

export type csgoStrategyGraphQLServiceContext = {
  csgoStrategyGraphQLService: IcsgoStrategyGraphQLService<Document>
}

export const csgoStrategyGraphQLService: IcsgoStrategyGraphQLService<
  Document
> = {
  Query: {
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

    csgoStrategiesByMap: async ({
      map
    }: {
      map: string
    }): Promise<Document[]> =>
      await MongooseModelCSGOStrategy.find({ map })
        .exec()
        .then((docs: Document[]) => docs)
        .catch((error: Error) => {
          throw error
        })
  },
  Mutation: {
    submitCSGOStrategy: async ({
      strategy
    }: {
      strategy: ICSGOStrategyDocument.Strategy
    }): Promise<{ result: boolean; errors: string[] }> => {
      const validationResult: {
        result: boolean
        errors: string[]
      } = await csgoStrategyValidator(strategy)
        .then(async (result: ValidatorReturnType) => {
          const es: string[] = []

          result.errors.forEach((error: Error) => es.push(error.toString()))

          if (result.errors.length === 0) {
            await MongooseModelCSGOStrategy.create([ strategy ])
              .then((mongoResult: mongoose.Document[]) => {
                return mongoResult
              })
              .catch((error: MongoError) => {
                console.log(error)
              })
          }

          return {
            result: result.errors.length > 0 ? false : true,
            errors: result.errors.length > 0 ? es : []
          }
        })
        .catch((e: Error) => {
          return { result: false, errors: [ e.toString() ] }
        })

      // Return result of submission. TODO: insert to db -> get submitted result document from db -> return document
      return validationResult
    }
  }
}
