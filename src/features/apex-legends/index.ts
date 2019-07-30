import { FeatureExport } from '~src/types/FeatureExport'
import { ApexLegendsGraphQLShema } from './graphql/ApexLegendsGraphQLSchema'
import { ApexLegendsContainer } from './di/ApexLegendsDI'

const apexLegendsFeatureExport: FeatureExport = {
  schema: ApexLegendsContainer.resolve(ApexLegendsGraphQLShema).schema
}

// tslint:disable-next-line: no-default-export
export default apexLegendsFeatureExport
