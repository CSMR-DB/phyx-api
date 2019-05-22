"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csgoStrategy_schema_1 = require("~src/features/csgo/graphql/csgoStrategy.schema");
var graphql_tools_1 = require("graphql-tools");
var schemas = graphql_tools_1.mergeSchemas({
    schemas: [csgoStrategy_schema_1.csgoSchema]
});
exports.default = schemas;
