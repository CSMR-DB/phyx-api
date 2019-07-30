"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var apollo_server_1 = require("apollo-server");
var apollo_server_caching_1 = require("apollo-server-caching");
var importFeatures_1 = require("./graphql/importFeatures");
require('./mongodb');
function startServer(_a) {
    var featureSchemas = _a.featureSchemas, featureContexts = _a.featureContexts;
    var context = featureContexts.reduce(function (o) { return (tslib_1.__assign({}, o)); });
    var server = new apollo_server_1.ApolloServer({
        schema: apollo_server_1.mergeSchemas({ schemas: featureSchemas }),
        cors: true,
        context: context,
        cache: new apollo_server_caching_1.InMemoryLRUCache({})
    });
    server
        .listen()
        .then(function () {
        console.log("\uD83D\uDE80 Apollo Server ready at http://localhost:4000" + server.graphqlPath + " ");
    })
        .catch(function (error) {
        throw error;
    });
}
importFeatures_1.importFeatures()
    .then(function (featureObj) { return startServer(featureObj); })
    .catch(function (error) {
    throw error;
});
