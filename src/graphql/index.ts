import { csgoSchema } from '~src/features/csgo/graphql/csgo.schema'
import { mergeSchemas } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'

export const schemas: GraphQLSchema = mergeSchemas({
  schemas: [ csgoSchema ]
})
