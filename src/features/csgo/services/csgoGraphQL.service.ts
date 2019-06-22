import mongoose, { Document } from 'mongoose'
import { ICSGODocuments } from '../interfaces/ICSGODocuments.interface'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { csgoStrategyValidator } from '../validators/preset/csgoStrategyValidator'
import { MongoError } from 'mongodb'

import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'
import { MongooseModelCSGOMap } from './../mongodb/csgo-map.mongodb.model'
import { MongooseModelCSGOItem } from '../mongodb/csgo-item.mongodb.model'
import { idGenerator } from '~src/utils/idGenerator'
import { GraphQLMutationResult } from '~src/graphql/shared.types'

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
    }) => Promise<GraphQLMutationResult>

    createCSGOStrategies: ({
      strategies
    }: {
      strategies: ICSGODocuments.Strategy[]
    }) => Promise<GraphQLMutationResult[]>

    createCSGOMap: ({
      map
    }: {
      map: ICSGODocuments.NewMap
    }) => Promise<GraphQLMutationResult>

    createCSGOMaps: ({
      maps
    }: {
      maps: ICSGODocuments.NewMap[]
    }) => Promise<GraphQLMutationResult[]>

    createCSGOItem: ({
      item
    }: {
      item: ICSGODocuments.NewItem
    }) => Promise<GraphQLMutationResult>

    createCSGOItems: ({
      items
    }: {
      items: ICSGODocuments.NewItem[]
    }) => Promise<GraphQLMutationResult[]>
  }
}

export type csgoGraphQLServiceContext = {
  csgoGraphQLService: IcsgoGraphQLService
}

async function createCSGOStrategy({
  strategy
}: {
  strategy: ICSGODocuments.Strategy
}): Promise<GraphQLMutationResult> {
  return await csgoStrategyValidator(strategy)
    .then(async (validatorResult: ValidatorReturnType) => {
      const errors: string[] = validatorResult.errors.map((error: Error) =>
        error.toString()
      )

      if (validatorResult.errors.length === 0) {
        await MongooseModelCSGOStrategy.create(strategy)
          .then(() => {
            console.log('Strategy validated & submitted 😃')
          })
          .catch((error: MongoError) => {
            errors.push(error.toString())
          })
      }

      return {
        result: validatorResult.errors.length > 0 ? false : true,
        errors
      }
    })
    .catch((error: Error) => {
      return { result: false, errors: [ error.toString() ] }
    })
}

async function createCSGOStrategies({
  strategies
}: {
  strategies: ICSGODocuments.Strategy[]
}): Promise<GraphQLMutationResult[]> {
  return await Promise.all(
    strategies.map(
      async (strategy: ICSGODocuments.Strategy) =>
        await createCSGOStrategy({ strategy })
    )
  )
}

async function createCSGOMap({
  map
}: {
  map: ICSGODocuments.NewMap
}): Promise<GraphQLMutationResult> {
  Object.assign(map, {
    internal_id: idGenerator(map.name, {
      uppercase: true
    })
  })

  return await MongooseModelCSGOMap.create(map)
    .then(() => ({
      result: true,
      errors: [] as string[]
    }))
    .catch((error: MongoError) => ({
      result: true,
      errors: [ error.toString() ]
    }))
}

async function createCSGOMaps({
  maps
}: {
  maps: ICSGODocuments.NewMap[]
}): Promise<GraphQLMutationResult[]> {
  return await Promise.all(
    maps.map(async (map: ICSGODocuments.NewMap) => {
      return await createCSGOMap({ map })
    })
  )
}

async function createCSGOItem({
  item
}: {
  item: ICSGODocuments.NewItem
}): Promise<GraphQLMutationResult> {
  Object.assign(item, {
    internal_id: idGenerator(item.name, { uppercase: true })
  })

  return await MongooseModelCSGOItem.create(item)
    .then(() => ({
      result: true,
      errors: [] as string[]
    }))
    .catch((error: MongoError) => ({
      result: true,
      errors: [ error.toString() ]
    }))
}

async function createCSGOItems({
  items
}: {
  items: ICSGODocuments.NewItem[]
}): Promise<GraphQLMutationResult[]> {
  return Promise.all(
    items.map(async (item: ICSGODocuments.NewItem) => {
      return await createCSGOItem({ item })
    })
  )
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
      await MongooseModelCSGOMap.findOne({ internal_id: id })
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
      await MongooseModelCSGOItem.findOne({ internal_id: id })
        .exec()
        .then((doc: Document | null) => doc)
        .catch((error: Error) => {
          throw error
        })
  },
  Mutation: {
    createCSGOStrategy,

    createCSGOStrategies,

    createCSGOMap,

    createCSGOMaps,

    createCSGOItem,

    createCSGOItems
  }
}
