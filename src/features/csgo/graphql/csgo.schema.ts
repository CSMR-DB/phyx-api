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
    ): Promise<{ result: boolean; errors: string[] }> => {
      return await ctx.csgoGraphQLService.Mutation.createCSGOStrategy({
        strategy
      })
    },

    createCSGOMap: async (
      _: any,
      { map }: { map: ICSGODocuments.NewMap },
      ctx: csgoGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }> => {
      return await ctx.csgoGraphQLService.Mutation.createCSGOMap({
        map
      })
    },

    createCSGOItem: async (
      _: any,
      { item }: { item: ICSGODocuments.NewItem },
      ctx: csgoGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }> => {
      return await ctx.csgoGraphQLService.Mutation.createCSGOItem({
        item
      })
    }
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
