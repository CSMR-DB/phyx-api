import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import { ApexLegendsTypeDefs } from './ApexLegendsTypeDefs'
import { ApexLegendsResolvers } from './ApexLegendsResolvers'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'

@ApexLegendsInjectable()
export class ApexLegendsGraphQLShema {
  public schema: GraphQLSchema

  constructor(typeDefs: ApexLegendsTypeDefs, resolvers: ApexLegendsResolvers) {
    this.schema = makeExecutableSchema({
      typeDefs: typeDefs.typeDefs,
      resolvers: resolvers.resolvers
    })
  }
}
