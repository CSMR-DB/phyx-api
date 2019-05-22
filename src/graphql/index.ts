import { csgoSchema } from '~src/features/csgo/graphql/csgoStrategy.schema'
import { mergeSchemas } from 'graphql-tools'

const schemas = mergeSchemas({
  schemas: [ csgoSchema ]
})

export default schemas
