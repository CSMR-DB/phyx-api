import fs from 'fs'
import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'
import { makeExecutableSchema } from 'apollo-server'
import { GraphQLSchema, GraphQLError } from 'graphql'
import { Document } from 'mongoose'
import { csgoStrategyValidator } from '../validators/csgoStrategyValidator'
import { ICSGOStrategy } from '../interfaces/ICSGOStrategy.interface'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'

// tslint:disable-next-line: typedef
const resolvers = {
  Query: {
    csgoStrategy: async (
      _: any,
      { id }: { id: string }
    ): Promise<Document | null> =>
      await MongooseModelCSGOStrategy.findOne({ id })
        .exec()
        .then((doc: Document | null) => doc)
        .catch((error: GraphQLError) => {
          throw error
        }),
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
    ): Promise<Document[]> =>
      await MongooseModelCSGOStrategy.find({ map })
        .exec()
        .then((docs: Document[]) => docs)
        .catch((error: GraphQLError) => {
          throw error
        })
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
  typeDefs: fs.readFileSync(__dirname + '/csgoStrategy.types.gql', 'utf8'),
  resolvers
})
