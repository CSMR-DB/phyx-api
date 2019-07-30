import fs from 'fs'
import { ITypeDefinitions } from 'graphql-tools'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'

@ApexLegendsInjectable()
export class ApexLegendsTypeDefs {
  typeDefs: ITypeDefinitions = [
    fs.readFileSync('src/graphql/shared.types.gql', 'utf8'),
    fs.readFileSync(__dirname + '/ApexLegends.types.gql', 'utf8'),
    fs.readFileSync(__dirname + '/ApexLegendsItem.types.gql', 'utf8'),
    fs.readFileSync(__dirname + '/ApexLegendsLegend.types.gql', 'utf8')
  ]
}
