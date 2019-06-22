import fs from 'fs'
import { makeExecutableSchema } from 'apollo-server'
import { GraphQLSchema } from 'graphql'
import { Document } from 'mongoose'
import { ICSGODocuments } from '../interfaces/ICSGODocuments.interface'
import { csgoGraphQLServiceContext } from '../services/csgoGraphQL.service'

// tslint:disable-next-line: typedef
const resolvers = {
  Query: {
    csgoStrategy: async (
      _: any,
      { id }: { id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<Document | null | undefined> =>
      await ctx.csgoGraphQLService.Query.csgoStrategy({ id }),

    csgoStrategies: async (
      _: any,
      _args: any,
      ctx: csgoGraphQLServiceContext
    ): Promise<Document[]> =>
      await ctx.csgoGraphQLService.Query.csgoStrategies(),

    csgoStrategiesByMap: async (
      _: any,
      { map }: { map: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<Document[]> =>
      await ctx.csgoGraphQLService.Query.csgoStrategiesByMap({ map }),

    csgoItems: async (
      _: any,
      _args: any,
      ctx: csgoGraphQLServiceContext
    ): Promise<Document[]> => await ctx.csgoGraphQLService.Query.csgoItems(),

    csgoItem: async (
      _: any,
      { id }: { id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<Document | null | undefined> =>
      await ctx.csgoGraphQLService.Query.csgoItem({ id }),

    csgoMaps: async (
      _: any,
      _args: any,
      ctx: csgoGraphQLServiceContext
    ): Promise<Document[]> => await ctx.csgoGraphQLService.Query.csgoMaps(),

    csgoMap: async (
      _: any,
      { id }: { id: string },
      ctx: csgoGraphQLServiceContext
    ): Promise<Document | null | undefined> =>
      await ctx.csgoGraphQLService.Query.csgoMap({ id })
  },
  Mutation: {
    createCSGOStrategy: async (
      _: any,
      { strategy }: { strategy: ICSGODocuments.Strategy },
      ctx: csgoGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOStrategy({
        strategy
      }),

    createCSGOStrategies: async (
      _: any,
      { strategies }: { strategies: ICSGODocuments.Strategy[] },
      ctx: csgoGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }[]> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOStrategies({
        strategies
      }),

    createCSGOMap: async (
      _: any,
      { map }: { map: ICSGODocuments.NewMap },
      ctx: csgoGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOMap({
        map
      }),

    createCSGOMaps: async (
      _: any,
      { maps }: { maps: ICSGODocuments.NewMap[] },
      ctx: csgoGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }[]> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOMaps({
        maps
      }),

    createCSGOItem: async (
      _: any,
      { item }: { item: ICSGODocuments.NewItem },
      ctx: csgoGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOItem({
        item
      }),

    createCSGOItems: async (
      _: any,
      { items }: { items: ICSGODocuments.NewItem[] },
      ctx: csgoGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }[]> =>
      await ctx.csgoGraphQLService.Mutation.createCSGOItems({
        items
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
})
