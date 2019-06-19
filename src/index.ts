import { ApolloServer } from 'apollo-server'
require('./mongodb')
import { schemas } from './graphql'
import { csgoStrategyGraphQLService } from './features/csgo/services/csgoStrategyGraphQL.service'
import { InMemoryLRUCache } from 'apollo-server-caching'

const server: ApolloServer = new ApolloServer({
  schema: schemas,
  cors: true,
  context: { csgoStrategyGraphQLService },
  cache: new InMemoryLRUCache({})
})

server
  .listen()
  .then(() => {
    console.log(
      `🚀 Apollo Server ready at http://localhost:4000${server.graphqlPath}`
    )
  })
  .catch((e: Error) => {
    throw e
  })
