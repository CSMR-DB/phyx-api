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
    }): Promise<{
      result: boolean
      errors: string[]
      _id?: string | null
    }> => {
      const result: {
        result: boolean
        errors: string[]
        _id?: string | null
      } = await csgoStrategyValidator(strategy)
        .then(async (validatorResult: ValidatorReturnType) => {
          const errors: string[] = []

          validatorResult.errors.forEach((error: Error) =>
            errors.push(error.toString())
          )

          let _id: string | null = null

          if (validatorResult.errors.length === 0) {
            await MongooseModelCSGOStrategy.create(strategy)
              .then((mongoResult: mongoose.Document) => {
                _id = mongoResult._id

                return mongoResult._id
              })
              .catch((error: MongoError) => {
                console.log(error)

                errors.push(error.toString())
              })
          }

          return {
            result: validatorResult.errors.length > 0 ? false : true,
            errors: validatorResult.errors.length > 0 ? errors : [],
            _id
          }
        })
        .catch((e: Error) => {
          return { result: false, errors: [ e.toString() ] }
        })

      // Return result of submission. TODO: insert to db -> get submitted result document from db -> return document
      return result
    }
  }
}
