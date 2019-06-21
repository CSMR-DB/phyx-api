import mongoose, { Document } from 'mongoose'
import { ICSGODocuments } from '../interfaces/ICSGODocuments.interface'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { csgoStrategyValidator } from '../validators/preset/csgoStrategyValidator'
import { MongoError } from 'mongodb'

import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'
import { MongooseModelCSGOMap } from './../mongodb/csgo-map.mongodb.model'
import { MongooseModelCSGOItem } from '../mongodb/csgo-item.mongodb.model'
import { idGenerator } from '~src/utils/idGenerator'

export interface IcsgoGraphQLService {
  Query: {
    csgoStrategy: ({
      id
    }: {
      id: string
    }) => Promise<Document | null | undefined>
    csgoStrategies: () => Promise<Document[]>
    csgoStrategiesByMap: ({ map }: { map: string }) => Promise<Document[]>

    csgoMaps: () => Promise<Document[]>
    csgoMap: ({ id }: { id: string }) => Promise<Document | null | undefined>

    csgoItems: () => Promise<Document[]>
    csgoItem: ({ id }: { id: string }) => Promise<Document | null | undefined>
  }
  Mutation: {
    createCSGOStrategy: ({
      strategy
    }: {
      strategy: ICSGODocuments.Strategy
    }) => Promise<{ result: boolean; errors: string[] }>

    createCSGOMap: ({
      map
    }: {
      map: ICSGODocuments.NewMap
    }) => Promise<{ result: boolean; errors: string[] }>

    createCSGOItem: ({
      item
    }: {
      item: ICSGODocuments.NewItem
    }) => Promise<{ result: boolean; errors: string[] }>
  }
}

export type csgoGraphQLServiceContext = {
  csgoGraphQLService: IcsgoGraphQLService
}

export const csgoGraphQLService: IcsgoGraphQLService = {
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
        }),

    csgoMaps: async (): Promise<Document[]> =>
      await MongooseModelCSGOMap.find({})
        .exec()
        .then((docs: Document[]) => docs)
        .catch((error: Error) => {
          throw error
        }),

    csgoMap: async ({
      id
    }: {
      id: string
    }): Promise<Document | null | undefined> =>
      await MongooseModelCSGOMap.findOne({ id })
        .exec()
        .then((doc: Document | null) => doc)
        .catch((error: Error) => {
          throw error
        }),

    csgoItems: async (): Promise<Document[]> =>
      await MongooseModelCSGOItem.find({})
        .exec()
        .then((docs: Document[]) => docs)
        .catch((error: Error) => {
          throw error
        }),

    csgoItem: async ({
      id
    }: {
      id: string
    }): Promise<Document | null | undefined> =>
      await MongooseModelCSGOItem.findOne({ id })
        .exec()
        .then((doc: Document | null) => doc)
        .catch((error: Error) => {
          throw error
        })
  },
  Mutation: {
    createCSGOStrategy: async ({
      strategy
    }: {
      strategy: ICSGODocuments.Strategy
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
    },

    createCSGOMap: async ({
      map
    }: {
      map: ICSGODocuments.NewMap
    }): Promise<{
      result: boolean
      errors: string[]
      _id?: string | null
    }> => {
      const result: {
        result: boolean
        errors: string[]
        _id?: string | null
      } = { result: false, errors: [] }

      Object.assign(map, {
        internal_id: idGenerator(map.name, { uppercase: true })
      })

      await MongooseModelCSGOMap.create(map)
        .then((mongoResult: mongoose.Document) => {
          result.result = true

          result._id = mongoResult._id
        })
        .catch((error: MongoError) => {
          console.log(error)

          result.errors.push(error.toString())
        })

      return result
    },

    createCSGOItem: async ({
      item
    }: {
      item: ICSGODocuments.NewItem
    }): Promise<{
      result: boolean
      errors: string[]
    }> => {
      const result: {
        result: boolean
        errors: string[]
        _id?: string | null
      } = { result: false, errors: [] }

      Object.assign(item, {
        internal_id: idGenerator(item.name, { uppercase: true })
      })

      await MongooseModelCSGOItem.create(item)
        .then((mongoResult: mongoose.Document) => {
          result.result = true

          result._id = mongoResult._id
        })
        .catch((error: MongoError) => {
          console.log(error)

          result.errors.push(error.toString())
        })

      return result
    }
  }
}
