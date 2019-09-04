"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const apollo_server_caching_1 = require("apollo-server-caching");
const importFeatures_1 = require("./graphql/importFeatures");
require('./mongodb');
function startServer({ featureSchemas, featureContexts }) {
    const context = featureContexts.reduce((o) => ({ ...o }));
    const server = new apollo_server_1.ApolloServer({
        schema: apollo_server_1.mergeSchemas({ schemas: featureSchemas }),
        cors: true,
        context,
        cache: new apollo_server_caching_1.InMemoryLRUCache({})
    });
    server
        .listen()
        .then(() => {
        console.log(`🚀 Apollo Server ready at http://localhost:4000${server.graphqlPath} `);
    })
        .catch((error) => {
        throw error;
    });
}
importFeatures_1.importFeatures()
    .then((featureObj) => startServer(featureObj))
    .catch((error) => {
    throw error;
});
