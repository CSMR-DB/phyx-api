"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
const typeDefs = apollo_server_koa_1.gql `
  type Query {
    hello: String
    bye: String
  }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        bye: () => 'See you again!'
    }
};
exports.helloworldSchema = apollo_server_koa_1.makeExecutableSchema({
    typeDefs,
    resolvers
});
//# sourceMappingURL=helloworld-schema.js.map