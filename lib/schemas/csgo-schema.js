"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_koa_1 = require("apollo-server-koa");
const csgo_strategy_mock_1 = tslib_1.__importDefault(require("./../mocks/csgo-strategy.mock"));
const csgoTypeDefs = apollo_server_koa_1.gql `
  type Primary {
    cost: Int!
    name: String
    type: String
  }

  type Secondary {
    cost: Int!
    name: String!
  }

  type GearFields {
    cost: Int!
    equipped: Boolean
  }

  type Gear {
    cost: Int!
    kevlar: GearFields
    helmet: GearFields
    zeus: GearFields
  }

  type Loadout {
    cost: Int!
    primary: Primary
    secondary: Secondary!
    gear: Gear
    # utilities: Utilities
  }

  type Position {
    x: Int!
    y: Int!
  }

  type Player {
    id: ID!
    name: String!
    role: String
    loadout: Loadout!
    positions: [Position]
  }

  type Team {
    name: String
    players: [Player]
  }

  type CSGOStrategy {
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
  }
`;
const resolvers = {
    Query: {
        csgoStrategies: () => csgo_strategy_mock_1.default
    }
};
exports.csgoSchema = apollo_server_koa_1.makeExecutableSchema({
    typeDefs: csgoTypeDefs,
    resolvers
});
//# sourceMappingURL=csgo-schema.js.map