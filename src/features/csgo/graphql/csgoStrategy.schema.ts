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
      await ctx.csgoGraphQLService.Query.csgoStrategiesByMap({ map })
  },
  Mutation: {
    submitCSGOStrategy: async (
      _: any,
      { strategy }: { strategy: ICSGODocuments.Strategy },
      ctx: csgoGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }> => {
      return await ctx.csgoGraphQLService.Mutation.submitCSGOStrategy({
        strategy
      })
    }
  }
}

export const csgoSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: fs.readFileSync(__dirname + '/csgoStrategy.types.gql', 'utf8'),
  resolvers
})
