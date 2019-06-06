import { csgoSchema } from '~src/features/csgo/graphql/csgoStrategy.schema'
import { mergeSchemas } from 'graphql-tools'

export const schemas = mergeSchemas({
  schemas: [ csgoSchema ]
})
