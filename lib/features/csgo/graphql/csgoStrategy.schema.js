"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var csgo_strategy_mongodb_model_1 = tslib_1.__importDefault(require("../mongodb/csgo-strategy.mongodb.model"));
var apollo_server_1 = require("apollo-server");
var csgoTypeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  type Item {\n    internal_id: String!\n  }\n\n  type Loadout {\n    cost: Int!\n    primary: Item\n    secondary: Item!\n    gear: [Item]\n    utilities: [Item]\n  }\n\n  type Position {\n    x: Int!\n    y: Int!\n  }\n\n  type Player {\n    internal_id: ID!\n    color: String!\n    name: String!\n    role: String\n    loadout: Loadout!\n    positions: [Position!]!\n  }\n\n  type Players {\n    player_1: Player!\n    player_2: Player!\n    player_3: Player!\n    player_4: Player!\n    player_5: Player!\n  }\n\n  type Team {\n    team_id: ID\n    name: String\n    players: Players!\n  }\n\n  type CSGOStrategy {\n    _id: ID!\n    id: ID!\n    name: String!\n    map: String!\n    description: String\n    side: String!\n    team: Team!\n    budget: Int\n  }\n\n  type Query {\n    csgoStrategies: [CSGOStrategy!]!\n    csgoStrategiesByMap(map: String): [CSGOStrategy!]!\n    csgoStrategy(id: String): CSGOStrategy!\n  }\n"], ["\n  type Item {\n    internal_id: String!\n  }\n\n  type Loadout {\n    cost: Int!\n    primary: Item\n    secondary: Item!\n    gear: [Item]\n    utilities: [Item]\n  }\n\n  type Position {\n    x: Int!\n    y: Int!\n  }\n\n  type Player {\n    internal_id: ID!\n    color: String!\n    name: String!\n    role: String\n    loadout: Loadout!\n    positions: [Position!]!\n  }\n\n  type Players {\n    player_1: Player!\n    player_2: Player!\n    player_3: Player!\n    player_4: Player!\n    player_5: Player!\n  }\n\n  type Team {\n    team_id: ID\n    name: String\n    players: Players!\n  }\n\n  type CSGOStrategy {\n    _id: ID!\n    id: ID!\n    name: String!\n    map: String!\n    description: String\n    side: String!\n    team: Team!\n    budget: Int\n  }\n\n  type Query {\n    csgoStrategies: [CSGOStrategy!]!\n    csgoStrategiesByMap(map: String): [CSGOStrategy!]!\n    csgoStrategy(id: String): CSGOStrategy!\n  }\n"])));
var resolvers = {
    Query: {
        // csgoStrategies: () => csgoStrategies
        csgoStrategy: function (_, _a) {
            var id = _a.id;
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, csgo_strategy_mongodb_model_1.default.findOne({ id: id })
                                .exec()
                                .then(function (doc) { return doc; })
                                .catch(function (error) {
                                throw error;
                            })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        csgoStrategies: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, csgo_strategy_mongodb_model_1.default.find({})
                            .exec()
                            .then(function (docs) { return docs; })
                            .catch(function (error) {
                            throw error;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        csgoStrategiesByMap: function (_, _a) {
            var map = _a.map;
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, csgo_strategy_mongodb_model_1.default.find({ map: map })
                                .exec()
                                .then(function (docs) { return docs; })
                                .catch(function (error) {
                                throw error;
                            })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        }
    }
};
exports.csgoSchema = apollo_server_1.makeExecutableSchema({
    typeDefs: csgoTypeDefs,
    resolvers: resolvers
});
var templateObject_1;
