import { ITypeDefinitions } from 'graphql-tools'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import { getGQLTypes } from '~src/utils/getGQLTypes';

@ApexLegendsInjectable()
export class ApexLegendsTypeDefs {
  typeDefs: ITypeDefinitions = [
    getGQLTypes('src/graphql/shared.types.gql'),
    getGQLTypes(__dirname + '/ApexLegends.types.gql'),
    getGQLTypes(__dirname + '/ApexLegendsItem.types.gql'),
    getGQLTypes(__dirname + '/ApexLegendsLegend.types.gql')
  ]
}
