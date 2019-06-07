import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'
import { gql, makeExecutableSchema } from 'apollo-server'
import { DocumentNode, GraphQLError, GraphQLSchema } from 'graphql'
import { Document } from 'mongoose'

const typeDefs: DocumentNode = gql`
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

  type Mutation {
    submitCSGOStrategy: String
  }
`

// tslint:disable-next-line: typedef
const resolvers = {
  Query: {
    csgoStrategy: async (
      _: any,
      { id }: { id: string }
    ): Promise<Document | null> => {
      return await MongooseModelCSGOStrategy.findOne({ id })
        .exec()
        .then((doc: Document | null) => doc)
        .catch((error: GraphQLError) => {
          throw error
        })
    },
    csgoStrategies: async (): Promise<Document[]> =>
      await MongooseModelCSGOStrategy.find({})
        .exec()
        .then((docs: Document[]) => docs)
        .catch((error: GraphQLError) => {
          throw error
        }),
    csgoStrategiesByMap: async (
      _: any,
      { map }: { map: string }
    ): Promise<Document[]> => {
      return await MongooseModelCSGOStrategy.find({ map })
        .exec()
        .then((docs: Document[]) => docs)
        .catch((error: GraphQLError) => {
          throw error
        })
    }
  },
  Mutation: {
    submitCSGOStrategy: async () => {
      console.log('submission ran?')
    }
  }
}

export const csgoSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})
