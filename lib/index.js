"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var apollo_server_1 = require("apollo-server");
require('./mongodb');
var graphql_1 = tslib_1.__importDefault(require("./graphql"));
var server = new apollo_server_1.ApolloServer({ schema: graphql_1.default, cors: true });
server.listen().then(function (_a) {
    console.log("\uD83D\uDE80 Apollo Server ready at http://localhost:4000" + server.graphqlPath);
});
