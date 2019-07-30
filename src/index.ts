import { ApolloServer, mergeSchemas } from 'apollo-server'
import { InMemoryLRUCache } from 'apollo-server-caching'
import { importFeatures, ImportFeaturesObject } from './graphql/importFeatures'

require('./mongodb')

function startServer({
  featureSchemas,
  featureContexts
}: ImportFeaturesObject): void {
  const context: Object = featureContexts.reduce((o: Object) => ({ ...o }))

  const server: ApolloServer = new ApolloServer({
    schema: mergeSchemas({ schemas: featureSchemas }),
    cors: true,
    context,
    cache: new InMemoryLRUCache({})
  })

  server
    .listen()
    .then(() => {
      console.log(
        `🚀 Apollo Server ready at http://localhost:4000${server.graphqlPath} `
      )
    })
    .catch((error: Error) => {
      throw error
    })
}

importFeatures()
  .then((featureObj: ImportFeaturesObject) => startServer(featureObj))
  .catch((error: Error) => {
    throw error
  })
