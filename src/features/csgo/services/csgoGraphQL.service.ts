import { ICSGODocuments, MongooseDocumentExtensionsCSGO } from '../interfaces'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { csgoStrategyValidator } from '../validators/preset/csgoStrategyValidator'
import { MongoError } from 'mongodb'

import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'
import { MongooseModelCSGOMap } from './../mongodb/csgo-map.mongodb.model'
import { MongooseModelCSGOItem } from '../mongodb/csgo-item.mongodb.model'
import { idGenerator } from '~src/utils/idGenerator'
import { GraphQLMutationResult } from '~src/graphql/shared.types'
import { Types } from 'mongoose'

export interface IcsgoGraphQLService {
  Query: {
    csgoStrategy: ({
      id
    }: {
      id: string
    }) => Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy | null | undefined
    >
    csgoStrategies: () => Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]
    >
    csgoStrategiesByMap: ({
      map
    }: {
      map: string
    }) => Promise<MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]>

    csgoMaps: () => Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    >
    csgoMap: ({
      id
    }: {
      id: string
    }) => Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseMap | null | undefined
    >

    csgoItems: () => Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    >
    csgoItem: ({
      id
    }: {
      id: string
    }) => Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseItem | null | undefined
    >
  }
  Mutation: {
    createCSGOStrategy: ({
      strategy
    }: {
      strategy: ICSGODocuments.Input.Strategy
    }) => Promise<GraphQLMutationResult>

    createCSGOStrategies: ({
      strategies
    }: {
      strategies: ICSGODocuments.Input.Strategy[]
    }) => Promise<GraphQLMutationResult[]>

    updateCSGOStrategy: ({
      id,
      strategy
    }: {
      id: Types.ObjectId
      strategy: ICSGODocuments.Input.Strategy
    }) => Promise<GraphQLMutationResult>

    deleteCSGOStrategy: ({
      id
    }: {
      id: Types.ObjectId
    }) => Promise<GraphQLMutationResult>

    deleteCSGOStrategies: ({
      ids
    }: {
      ids: Types.ObjectId[]
    }) => Promise<GraphQLMutationResult>

    createCSGOMap: ({
      map
    }: {
      map: ICSGODocuments.Input.Map
    }) => Promise<GraphQLMutationResult>

    createCSGOMaps: ({
      maps
    }: {
      maps: ICSGODocuments.Input.Map[]
    }) => Promise<GraphQLMutationResult[]>

    updateCSGOMap: ({
      id,
      map
    }: {
      id: Types.ObjectId
      map: ICSGODocuments.Input.Map
    }) => Promise<GraphQLMutationResult>

    deleteCSGOMap: ({
      id
    }: {
      id: Types.ObjectId
    }) => Promise<GraphQLMutationResult>

    createCSGOItem: ({
      item
    }: {
      item: ICSGODocuments.Input.Item
    }) => Promise<GraphQLMutationResult>

    createCSGOItems: ({
      items
    }: {
      items: ICSGODocuments.Input.Item[]
    }) => Promise<GraphQLMutationResult[]>

    updateCSGOItem: ({
      id,
      item
    }: {
      id: Types.ObjectId
      item: ICSGODocuments.Input.Item
    }) => Promise<GraphQLMutationResult>

    deleteCSGOItem: ({
      id
    }: {
      id: Types.ObjectId
    }) => Promise<GraphQLMutationResult>
  }
}

export type csgoGraphQLServiceContext = {
  csgoGraphQLService: IcsgoGraphQLService
}

async function createCSGOStrategy({
  strategy
}: {
  strategy: ICSGODocuments.Input.Strategy
}): Promise<GraphQLMutationResult> {
  return await csgoStrategyValidator(strategy)
    .then(async (validatorResult: ValidatorReturnType) => {
      const errors: string[] = validatorResult.errors.map((error: Error) =>
        error.toString()
      )

      if (validatorResult.errors.length === 0) {
        await MongooseModelCSGOStrategy.create(strategy)
          .then(() => {
            // console.log('Strategy validated & submitted 😃')
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
  strategies: ICSGODocuments.Input.Strategy[]
}): Promise<GraphQLMutationResult[]> {
  return await Promise.all(
    strategies.map(
      async (strategy: ICSGODocuments.Input.Strategy) =>
        await createCSGOStrategy({ strategy })
    )
  )
}

async function updateCSGOStrategy({
  id,
  strategy
}: {
  id: Types.ObjectId
  strategy: ICSGODocuments.Input.Strategy
}): Promise<GraphQLMutationResult> {
  return await csgoStrategyValidator(strategy)
    .then(async (validatorResult: ValidatorReturnType) => {
      const errors: string[] = validatorResult.errors.map((error: Error) =>
        error.toString()
      )

      if (validatorResult.errors.length === 0) {
        await MongooseModelCSGOStrategy.updateOne({ _id: id }, strategy)
          .then(() => ({ result: true, errors: [] }))
          .catch((error: MongoError) => ({
            result: false,
            errors: [ error.toString() ]
          }))
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

async function deleteCSGOStrategy({
  id
}: {
  id: Types.ObjectId
}): Promise<GraphQLMutationResult> {
  return await MongooseModelCSGOStrategy.deleteOne({ _id: id })
    .then(() => ({ result: true, errors: [] }))
    .catch((error: MongoError) => ({
      result: false,
      errors: [ error.toString() ]
    }))
}

async function deleteCSGOStrategies({
  ids
}: {
  ids: Types.ObjectId[]
}): Promise<GraphQLMutationResult> {
  return await MongooseModelCSGOStrategy.deleteMany({ _id: { $in: ids } })
    .then(() => ({ result: true, errors: [] }))
    .catch((error: MongoError) => ({
      result: false,
      errors: [ error.toString() ]
    }))
}

async function createCSGOMap({
  map
}: {
  map: ICSGODocuments.Input.Map
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
  maps: ICSGODocuments.Input.Map[]
}): Promise<GraphQLMutationResult[]> {
  return await Promise.all(
    maps.map(async (map: ICSGODocuments.Input.Map) => {
      return await createCSGOMap({ map })
    })
  )
}

async function updateCSGOMap({
  id,
  map
}: {
  id: Types.ObjectId
  map: ICSGODocuments.Input.Map
}): Promise<GraphQLMutationResult> {
  return await MongooseModelCSGOMap.updateOne({ _id: id }, map)
    .then(() => ({
      result: true,
      errors: [] as string[]
    }))
    .catch((error: MongoError) => ({
      result: true,
      errors: [ error.toString() ]
    }))
}

async function deleteCSGOMap({
  id
}: {
  id: Types.ObjectId
}): Promise<GraphQLMutationResult> {
  return await MongooseModelCSGOMap.deleteOne({ _id: id })
    .then(() => ({ result: true, errors: [] }))
    .catch((error: MongoError) => ({
      result: false,
      errors: [ error.toString() ]
    }))
}

async function createCSGOItem({
  item
}: {
  item: ICSGODocuments.Input.Item
}): Promise<GraphQLMutationResult> {
  Object.assign(item, {
    internal_id: idGenerator(item.name, {
      uppercase: true
    })
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
  items: ICSGODocuments.Input.Item[]
}): Promise<GraphQLMutationResult[]> {
  return Promise.all(
    items.map(async (item: ICSGODocuments.Input.Item) => {
      return await createCSGOItem({ item })
    })
  )
}

async function updateCSGOItem({
  id,
  item
}: {
  id: Types.ObjectId
  item: ICSGODocuments.Input.Item
}): Promise<GraphQLMutationResult> {
  return await MongooseModelCSGOItem.updateOne({ _id: id }, item)
    .then(() => ({
      result: true,
      errors: [] as string[]
    }))
    .catch((error: MongoError) => ({
      result: true,
      errors: [ error.toString() ]
    }))
}

async function deleteCSGOItem({
  id
}: {
  id: Types.ObjectId
}): Promise<GraphQLMutationResult> {
  return await MongooseModelCSGOItem.deleteOne({ _id: id })
    .then(() => ({ result: true, errors: [] }))
    .catch((error: MongoError) => ({
      result: false,
      errors: [ error.toString() ]
    }))
}

export const csgoGraphQLService: IcsgoGraphQLService = {
  Query: {
    csgoStrategy: async ({
      id
    }: {
      id: string
    }): Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy | null | undefined
    > => {
      return await MongooseModelCSGOStrategy.findOne({ id })
        .exec()
        .then(
          (
            doc: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy | null
          ) => doc
        )
        .catch((error: Error) => {
          throw error
        })
    },

    csgoStrategies: async (): Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]
    > => {
      return await MongooseModelCSGOStrategy.find({})
        .exec()
        .then(
          (docs: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]) =>
            docs
        )
        .catch((error: Error) => {
          throw error
        })
    },

    csgoStrategiesByMap: async ({
      map
    }: {
      map: string
    }): Promise<MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]> =>
      await MongooseModelCSGOStrategy.find({ map })
        .exec()
        .then(
          (docs: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]) =>
            docs
        )
        .catch((error: Error) => {
          throw error
        }),

    csgoMaps: async (): Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    > =>
      await MongooseModelCSGOMap.find({})
        .exec()
        .then(
          (docs: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]) => docs
        )
        .catch((error: Error) => {
          throw error
        }),

    csgoMap: async ({
      id
    }: {
      id: string
    }): Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseMap | null | undefined
    > =>
      await MongooseModelCSGOMap.findOne({ internal_id: id })
        .exec()
        .then(
          (doc: MongooseDocumentExtensionsCSGO.Output.IMongooseMap | null) =>
            doc
        )
        .catch((error: Error) => {
          throw error
        }),

    csgoItems: async (): Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    > =>
      await MongooseModelCSGOItem.find({})
        .exec()
        .then(
          (docs: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]) => docs
        )
        .catch((error: Error) => {
          throw error
        }),

    csgoItem: async ({
      id
    }: {
      id: string
    }): Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseItem | null | undefined
    > =>
      await MongooseModelCSGOItem.findOne({ internal_id: id })
        .exec()
        .then(
          (doc: MongooseDocumentExtensionsCSGO.Output.IMongooseItem | null) =>
            doc
        )
        .catch((error: Error) => {
          throw error
        })
  },
  Mutation: {
    createCSGOStrategy,

    createCSGOStrategies,

    updateCSGOStrategy,

    deleteCSGOStrategy,

    deleteCSGOStrategies,

    createCSGOMap,

    createCSGOMaps,

    updateCSGOMap,

    deleteCSGOMap,

    createCSGOItem,

    createCSGOItems,

    updateCSGOItem,

    deleteCSGOItem
  }
}
