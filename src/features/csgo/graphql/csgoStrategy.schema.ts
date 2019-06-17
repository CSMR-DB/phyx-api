import fs from 'fs'
import { makeExecutableSchema } from 'apollo-server'
import { GraphQLSchema } from 'graphql'
import { Document } from 'mongoose'
import { ICSGOStrategyDocument } from '../interfaces/ICSGOStrategyDocument.interface'
import { csgoStrategyGraphQLServiceContext } from '../services/csgoStrategyGraphQL.service'

// tslint:disable-next-line: typedef
const resolvers = {
  Query: {
    csgoStrategy: async (
      _: any,
      { id }: { id: string },
      ctx: csgoStrategyGraphQLServiceContext
    ): Promise<Document | null | undefined> =>
      await ctx.csgoStrategyGraphQLService.Query.csgoStrategy({ id }),

    csgoStrategies: async (
      _: any,
      _args: any,
      ctx: csgoStrategyGraphQLServiceContext
    ): Promise<Document[]> =>
      await ctx.csgoStrategyGraphQLService.Query.csgoStrategies(),

    csgoStrategiesByMap: async (
      _: any,
      { map }: { map: string },
      ctx: csgoStrategyGraphQLServiceContext
    ): Promise<Document[]> =>
      await ctx.csgoStrategyGraphQLService.Query.csgoStrategiesByMap({ map })
  },
  Mutation: {
    submitCSGOStrategy: async (
      _: any,
      { strategy }: { strategy: ICSGOStrategyDocument.Strategy },
      ctx: csgoStrategyGraphQLServiceContext
    ): Promise<{ result: boolean; errors: string[] }> => {
      return await ctx.csgoStrategyGraphQLService.Mutation.submitCSGOStrategy({
        strategy
      })
    }
  }
}

export const csgoSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: fs.readFileSync(__dirname + '/csgoStrategy.types.gql', 'utf8'),
  resolvers
})
