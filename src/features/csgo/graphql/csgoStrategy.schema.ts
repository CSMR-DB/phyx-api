import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'
import { gql, makeExecutableSchema } from 'apollo-server'
import { DocumentNode, GraphQLSchema, GraphQLError } from 'graphql'
import { Document } from 'mongoose'
import { csgoStrategyValidator } from '../validators/csgoStrategyValidator'
import { ICSGOStrategy } from '../interfaces/ICSGOStrategy.interface'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'

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

  # ValidationReturnType
  type ValidationReturn {
    result: Boolean
    errors: [String]
  }

  # Define input model for submission
  input ItemInput {
    internal_id: String
  }

  input LoadoutInput {
    primary: ItemInput
    secondary: ItemInput
    gear: [ItemInput]
    utilities: [ItemInput]
  }

  input PlayerInput {
    color: String
    name: String
    role: String
    loadout: LoadoutInput!
  }

  input PlayersInput {
    player_1: PlayerInput
    player_2: PlayerInput
    player_3: PlayerInput
    player_4: PlayerInput
    player_5: PlayerInput
  }

  input TeamInput {
    name: String
    players: PlayersInput
  }

  input CSGOStrategyInput {
    name: String!
    side: String!
    description: String
    map: String!
    team: TeamInput
    budget: Int!
  }

  type Mutation {
    submitCSGOStrategy(strategy: CSGOStrategyInput): ValidationReturn
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
    submitCSGOStrategy: async (
      _: any,
      { strategy }: { strategy: ICSGOStrategy }
    ): Promise<{ result: boolean; errors: string[] }> => {
      let validationResult: { result: boolean; errors: string[] } = {
        result: false,
        errors: []
      }

      await csgoStrategyValidator(strategy)
        .then((result: void | ValidatorReturnType) => {
          if (result) {
            if (result.errors.length > 0) {
              result.errors.forEach((error: Error) => {
                validationResult.errors.push(error.toString())
              })
            } else {
              validationResult = { result: true, errors: [] }
            }
          }
        })
        .catch((e: Error) => {
          validationResult.errors = [ e.toString() ]
        })

      // Return result of submission. TODO: insert to db -> get submitted result document from db -> return document
      return validationResult
    }
  }
}

export const csgoSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})
