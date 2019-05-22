"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
const csgo_schema_1 = require("./csgo-schema");
const dev_schema_1 = require("./dev-schema");
const schemas = apollo_server_koa_1.mergeSchemas({
    schemas: [csgo_schema_1.csgoSchema, dev_schema_1.devSchema]
});
exports.default = schemas;
//# sourceMappingURL=index.js.map