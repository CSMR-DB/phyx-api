import fs from 'fs'
import {
  makeExecutableSchema,
  addResolveFunctionsToSchema
} from 'apollo-server'
import { GraphQLSchema } from 'graphql'
import { ICSGODocuments, MongooseDocumentExtensionsCSGO } from '../interfaces'
import { csgoGraphQLServiceContext } from '../services/csgoGraphQL.service'
import { GraphQLMutationResult } from '~src/graphql/shared.types'
import { Types } from 'mongoose'

const fieldResolvers: any = {
  CSGOLoadout: {
    async primary(
      _: any,
      { internal_id }: { internal_id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<
      MongooseDocumentExtensionsCSGO.IMongooseItem | null | undefined
    > {
      const item = ctx.csgoGraphQLService.Query.csgoItem({
        id: internal_id
      })

      console.log()

      return await ctx.csgoGraphQLService.Query.csgoItem({ id: internal_id })
    },
    async secondary(
      _: any,
      { internal_id }: { internal_id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<
      MongooseDocumentExtensionsCSGO.IMongooseItem | null | undefined
    > {
      return await ctx.csgoGraphQLService.Query.csgoItem({ id: internal_id })
    },
    async gear(
      _: any,
      internal_ids: { internal_id: string }[],
      ctx: csgoGraphQLServiceContext
    ): Promise<
      (MongooseDocumentExtensionsCSGO.IMongooseItem | null | undefined)[]
    > {
      const items: (
        | MongooseDocumentExtensionsCSGO.IMongooseItem
        | null
        | undefined)[] = []

      await internal_ids.map(async (itemID: { internal_id: string }) =>
        items.push(
          await ctx.csgoGraphQLService.Query.csgoItem({
            id: itemID.internal_id
          })
        )
      )

      return await items
    },
    async utilities(
      _: any,
      internal_ids: { internal_id: string }[],
      ctx: csgoGraphQLServiceContext
    ): Promise<
      (MongooseDocumentExtensionsCSGO.IMongooseItem | null | undefined)[]
    > {
      const items: (
        | MongooseDocumentExtensionsCSGO.IMongooseItem
        | null
        | undefined)[] = []

      await internal_ids.map(async (itemID: { internal_id: string }) =>
        items.push(
          await ctx.csgoGraphQLService.Query.csgoItem({
            id: itemID.internal_id
          })
        )
      )

      return await items
    }
  }
}

// tslint:disable-next-line: typedef
const resolvers = {
  Query: {
    csgoStrategy: async (
      _: any,
      { id }: { id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<
      MongooseDocumentExtensionsCSGO.IMongooseStrategy | null | undefined
    > => await ctx.csgoGraphQLService.Query.csgoStrategy({ id }),

    csgoStrategies: async (
      _: any,
      _args: any,
      ctx: csgoGraphQLServiceContext
    ): Promise<MongooseDocumentExtensionsCSGO.IMongooseStrategy[]> =>
      await ctx.csgoGraphQLService.Query.csgoStrategies(),

    csgoStrategiesByMap: async (
      _: any,
      { map }: { map: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<MongooseDocumentExtensionsCSGO.IMongooseStrategy[]> =>
      await ctx.csgoGraphQLService.Query.csgoStrategiesByMap({ map }),

    csgoItems: async (
      _: any,
      _args: any,
      ctx: csgoGraphQLServiceContext
    ): Promise<MongooseDocumentExtensionsCSGO.IMongooseItem[]> =>
      await ctx.csgoGraphQLService.Query.csgoItems(),

    csgoItem: async (
      _: any,
      { id }: { id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<
      MongooseDocumentExtensionsCSGO.IMongooseItem | null | undefined
    > => await ctx.csgoGraphQLService.Query.csgoItem({ id }),

    csgoMaps: async (
      _: any,
      _args: any,
      ctx: csgoGraphQLServiceContext
    ): Promise<MongooseDocumentExtensionsCSGO.IMongooseMap[]> =>
      await ctx.csgoGraphQLService.Query.csgoMaps(),

    csgoMap: async (
      _: any,
      { id }: { id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<
      MongooseDocumentExtensionsCSGO.IMongooseMap | null | undefined
    > => await ctx.csgoGraphQLService.Query.csgoMap({ id })
  },
  Mutation: {
    createCSGOStrategy: async (
      _: any,
      { strategy }: { strategy: ICSGODocuments.Strategy },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOStrategy({
        strategy
      }),

    createCSGOStrategies: async (
      _: any,
      { strategies }: { strategies: ICSGODocuments.Strategy[] },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult[]> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOStrategies({
        strategies
      }),

    updateCSGOStrategy: async (
      _: any,
      {
        id,
        strategy
      }: { id: Types.ObjectId; strategy: ICSGODocuments.Strategy },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.updateCSGOStrategy({
        id,
        strategy
      }),

    deleteCSGOStrategy: async (
      _: any,
      { id }: { id: Types.ObjectId },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.deleteCSGOStrategy({ id }),

    deleteCSGOStrategies: async (
      _: any,
      { ids }: { ids: Types.ObjectId[] },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.deleteCSGOStrategies({ ids }),

    createCSGOMap: async (
      _: any,
      { map }: { map: ICSGODocuments.NewMap },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOMap({
        map
      }),

    updateCSGOMap: async (
      _: any,
      { id, map }: { id: Types.ObjectId; map: ICSGODocuments.NewMap },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.updateCSGOMap({
        id,
        map
      }),

    deleteCSGOMap: async (
      _: any,
      { id }: { id: Types.ObjectId },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.deleteCSGOMap({
        id
      }),

    createCSGOMaps: async (
      _: any,
      { maps }: { maps: ICSGODocuments.NewMap[] },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult[]> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOMaps({
        maps
      }),

    createCSGOItem: async (
      _: any,
      { item }: { item: ICSGODocuments.NewItem },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOItem({
        item
      }),

    createCSGOItems: async (
      _: any,
      { items }: { items: ICSGODocuments.NewItem[] },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult[]> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOItems({
        items
      }),

    updateCSGOItem: async (
      _: any,
      { id, item }: { id: Types.ObjectId; item: ICSGODocuments.NewItem },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.updateCSGOItem({
        id,
        item
      }),

    deleteCSGOItem: async (
      _: any,
      { id }: { id: Types.ObjectId },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.deleteCSGOItem({
        id
      })
  }
}

export const csgoSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    fs.readFileSync('src/graphql/shared.types.gql', 'utf8'),
    fs.readFileSync(__dirname + '/csgoStrategy.types.gql', 'utf8'),
    fs.readFileSync(__dirname + '/csgoItem.types.gql', 'utf8'),
    fs.readFileSync(__dirname + '/csgoMap.types.gql', 'utf8')
  ],
  resolvers
  // ...fieldResolvers
})

// addResolveFunctionsToSchema(csgoSchema, { ...fieldResolvers })
