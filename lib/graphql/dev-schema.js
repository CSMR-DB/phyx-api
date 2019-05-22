"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_koa_1 = require("apollo-server-koa");
const dev_model_1 = tslib_1.__importDefault(require("../mongodb/models/dev.model"));
const devTypeDefs = apollo_server_koa_1.gql `
  type Dev {
    value: String!
    date: String!
    some: String
  }

  type Query {
    getDevs: [Dev!]!
  }
`;
const resolvers = {
    Query: {
        getDevs: async () => await dev_model_1.default.find({})
            .exec()
            .then((res) => res)
            .catch((err) => console.log(err))
    }
};
exports.devSchema = apollo_server_koa_1.makeExecutableSchema({
    typeDefs: devTypeDefs,
    resolvers
});
//# sourceMappingURL=dev-schema.js.map