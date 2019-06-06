import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'
import { gql, makeExecutableSchema } from 'apollo-server'

const csgoTypeDefs = gql`
  type Item {
    internal_id: String!
  }

  type Loadout {
    cost: Int!
    primary: Item
    secondary: Item!
    gear: [Item]
    utilities: [Item]
  }

  type Position {
    x: Int!
    y: Int!
  }

  type Player {
    internal_id: ID!
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
    team_id: ID
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
    budget: Int
  }

  type Query {
    csgoStrategies: [CSGOStrategy!]!
    csgoStrategiesByMap(map: String): [CSGOStrategy!]!
    csgoStrategy(id: String): CSGOStrategy!
  }
`

const resolvers = {
  Query: {
    // csgoStrategies: () => csgoStrategies
    csgoStrategy: async (_: any, { id }: { id: string }) => {
      return await MongooseModelCSGOStrategy.findOne({ id })
        .exec()
        .then(doc => doc)
        .catch(error => {
          throw error
        })
    },
    csgoStrategies: async () =>
      await MongooseModelCSGOStrategy.find({})
        .exec()
        .then(docs => docs)
        .catch(error => {
          throw error
        }),
    csgoStrategiesByMap: async (_: any, { map }: { map: string }) => {
      return await MongooseModelCSGOStrategy.find({ map })
        .exec()
        .then(docs => docs)
        .catch(error => {
          throw error
        })
    }
  }
}

export const csgoSchema = makeExecutableSchema({
  typeDefs: csgoTypeDefs,
  resolvers
})
