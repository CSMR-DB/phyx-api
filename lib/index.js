"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
require('./mongodb');
var graphql_1 = require("./graphql");
var csgoStrategyGraphQL_service_1 = require("./features/csgo/services/csgoStrategyGraphQL.service");
var apollo_server_caching_1 = require("apollo-server-caching");
var server = new apollo_server_1.ApolloServer({
    schema: graphql_1.schemas,
    cors: true,
    context: { csgoStrategyGraphQLService: csgoStrategyGraphQL_service_1.csgoStrategyGraphQLService },
    cache: new apollo_server_caching_1.InMemoryLRUCache({})
});
server
    .listen()
    .then(function () {
    console.log("\uD83D\uDE80 Apollo Server ready at http://localhost:4000" + server.graphqlPath);
})
    .catch(function (e) {
    throw e;
});
