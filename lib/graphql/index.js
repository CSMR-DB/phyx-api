"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csgo_schema_1 = require("~src/features/csgo/graphql/csgo.schema");
var graphql_tools_1 = require("graphql-tools");
exports.schemas = graphql_tools_1.mergeSchemas({
    schemas: [csgo_schema_1.csgoSchema]
});
