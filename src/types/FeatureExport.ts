import { GraphQLSchema } from 'graphql'

export type FeatureExport = {
  schema: GraphQLSchema
  context?: {
    [key: string]: {
      Query: {}
      Mutation: {}
    }
  }
}
