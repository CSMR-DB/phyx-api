"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var apollo_server_1 = require("apollo-server");
// tslint:disable-next-line: typedef
var resolvers = {
    Query: {
        csgoStrategy: function (_, _a, ctx) {
            var id = _a.id;
            return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ctx.csgoStrategyGraphQLService.Query.csgoStrategy({ id: id })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            }); });
        },
        csgoStrategies: function (_, _args, ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.csgoStrategyGraphQLService.Query.csgoStrategies()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
        csgoStrategiesByMap: function (_, _a, ctx) {
            var map = _a.map;
            return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ctx.csgoStrategyGraphQLService.Query.csgoStrategiesByMap({ map: map })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            }); });
        }
    },
    Mutation: {
        submitCSGOStrategy: function (_, _a, ctx) {
            var strategy = _a.strategy;
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, ctx.csgoStrategyGraphQLService.Mutation.submitCSGOStrategy({
                                strategy: strategy
                            })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        }
    }
};
exports.csgoSchema = apollo_server_1.makeExecutableSchema({
    typeDefs: fs_1.default.readFileSync(__dirname + '/csgoStrategy.types.gql', 'utf8'),
    resolvers: resolvers
});
