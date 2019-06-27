import fs from 'fs'
import { makeExecutableSchema } from 'apollo-server'
import { GraphQLSchema } from 'graphql'
import { ICSGODocuments, MongooseDocumentExtensionsCSGO } from '../interfaces'
import { csgoGraphQLServiceContext } from '../services/csgoGraphQL.service'
import { GraphQLMutationResult } from '~src/graphql/shared.types'
import { Types } from 'mongoose'

// tslint:disable-next-line: typedef
const resolvers = {
  Query: {
    csgoStrategy: async (
      _: any,
      { id }: { id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy | null | undefined
    > => await ctx.csgoGraphQLService.Query.csgoStrategy({ id }),

    csgoStrategies: async (
      _: any,
      _args: any,
      ctx: csgoGraphQLServiceContext
    ): Promise<MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]> =>
      await ctx.csgoGraphQLService.Query.csgoStrategies(),

    csgoStrategiesByMap: async (
      _: any,
      { map }: { map: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]> =>
      await ctx.csgoGraphQLService.Query.csgoStrategiesByMap({ map }),

    csgoItems: async (
      _: any,
      _args: any,
      ctx: csgoGraphQLServiceContext
    ): Promise<MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]> =>
      await ctx.csgoGraphQLService.Query.csgoItems(),

    csgoItem: async (
      _: any,
      { id }: { id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseItem | null | undefined
    > => await ctx.csgoGraphQLService.Query.csgoItem({ id }),

    csgoMaps: async (
      _: any,
      _args: any,
      ctx: csgoGraphQLServiceContext
    ): Promise<MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]> =>
      await ctx.csgoGraphQLService.Query.csgoMaps(),

    csgoMap: async (
      _: any,
      { id }: { id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<
      MongooseDocumentExtensionsCSGO.Output.IMongooseMap | null | undefined
    > => await ctx.csgoGraphQLService.Query.csgoMap({ id })
  },
  Mutation: {
    createCSGOStrategy: async (
      _: any,
      { strategy }: { strategy: ICSGODocuments.Input.Strategy },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOStrategy({
        strategy
      }),

    createCSGOStrategies: async (
      _: any,
      { strategies }: { strategies: ICSGODocuments.Input.Strategy[] },
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
      }: { id: Types.ObjectId; strategy: ICSGODocuments.Input.Strategy },
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
      { map }: { map: ICSGODocuments.Input.Map },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOMap({
        map
      }),

    updateCSGOMap: async (
      _: any,
      { id, map }: { id: Types.ObjectId; map: ICSGODocuments.Input.Map },
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
      { maps }: { maps: ICSGODocuments.Input.Map[] },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult[]> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOMaps({
        maps
      }),

    createCSGOItem: async (
      _: any,
      { item }: { item: ICSGODocuments.Input.Item },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOItem({
        item
      }),

    createCSGOItems: async (
      _: any,
      { items }: { items: ICSGODocuments.Input.Item[] },
      ctx: csgoGraphQLServiceContext
    ): Promise<GraphQLMutationResult[]> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOItems({
        items
      }),

    updateCSGOItem: async (
      _: any,
      { id, item }: { id: Types.ObjectId; item: ICSGODocuments.Input.Item },
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
