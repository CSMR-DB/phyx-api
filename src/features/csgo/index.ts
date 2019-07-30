import { csgoSchema } from './graphql/csgo.schema'
import { csgoGraphQLService } from './services/csgoGraphQL.service'
import { FeatureExport } from '~src/types/FeatureExport'

const csgoFeature: FeatureExport = {
  schema: csgoSchema,
  context: { csgoGraphQLService }
}

// tslint:disable-next-line: no-default-export
export default csgoFeature
