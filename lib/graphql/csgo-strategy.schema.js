"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import 'graphql-import-node'
// import * as csgoGQL from './csgo-schema.graphql'
const apollo_server_koa_1 = require("apollo-server-koa");
const csgo_strategy_model_1 = tslib_1.__importDefault(require("../mongodb/models/csgo-strategy.model"));
const csgoTypeDefs = apollo_server_koa_1.gql `
  type Primary {
    cost: Int!
    name: String!
    category: String!
  }

  type Secondary {
    cost: Int!
    name: String!
  }

  type GearFields {
    cost: Int!
    equipped: Boolean!
  }

  type Gear {
    cost: Int!
    kevlar: GearFields!
    helmet: GearFields!
    zeus: GearFields!
  }

  type UtilitiesFields {
    cost: Int!
    equipped: Int!
  }

  type Utilities {
    cost: Int!
    smoke: UtilitiesFields!
    flash: UtilitiesFields!
    frag: UtilitiesFields!
    fire: UtilitiesFields!
    decoy: UtilitiesFields!
  }

  type Loadout {
    cost: Int!
    primary: Primary
    secondary: Secondary!
    gear: Gear
    utilities: Utilities
  }

  type Position {
    x: Int!
    y: Int!
  }

  type Player {
    id: ID!
    color: String!
    name: String!
    role: String
    loadout: Loadout!
    positions: [Position!]!
  }

  type Players {
    player_1: Player!
    player_2: Player!
    player_3: Player!
    player_4: Player!
    player_5: Player!
  }

  type Team {
    name: String
    players: Players!
  }

  type CSGOStrategy {
    _id: ID!
    id: ID!
    name: String!
    map: String!
    description: String
    side: String!
    team: Team!
    economy: Int!
  }

  type Query {
    csgoStrategies: [CSGOStrategy!]!
    csgoStrategiesByMap(map: String): [CSGOStrategy!]!
    csgoStrategy(id: String): CSGOStrategy!
  }
`;
const resolvers = {
    Query: {
        // csgoStrategies: () => csgoStrategies
        csgoStrategy: async (root, { id }) => {
            return await csgo_strategy_model_1.default.findOne({ id })
                .exec()
                .then((doc) => doc)
                .catch((error) => {
                throw error;
            });
        },
        csgoStrategies: async () => await csgo_strategy_model_1.default.find({})
            .exec()
            .then((docs) => docs)
            .catch((error) => {
            throw error;
        }),
        csgoStrategiesByMap: async (root, { map }) => {
            return await csgo_strategy_model_1.default.find({ map })
                .exec()
                .then((docs) => docs)
                .catch((error) => {
                throw error;
            });
        }
    }
};
exports.csgoSchema = apollo_server_koa_1.makeExecutableSchema({
    typeDefs: csgoTypeDefs,
    resolvers
});
//# sourceMappingURL=csgo-strategy.schema.js.map