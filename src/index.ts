import { ApolloServer } from 'apollo-server'
require('./mongodb')
import { schemas } from './graphql'

const server: ApolloServer = new ApolloServer({ schema: schemas, cors: true })

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
