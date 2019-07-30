import { IResolvers } from 'graphql-tools'

export type GraphQLMutationResult = {
  result: boolean
  errors: string[]
}

// export type GraphQLResolversObject = {
//   Query?: { [key: string]: () => Promise<any> }
//   Mutation?: {
//     [key: string]: (
//       _: any,
//       args: any,
//       _ctx: any
//     ) => Promise<GraphQLMutationResult>
//   }
//   Subscription?: any
// }

export type GraphQLResolversObject =
  | IResolvers<any, any>
  | IResolvers<any, any>[]
  | undefined

export type MutationScenarios = {
  [key: string]: () => Promise<GraphQLMutationResult> | GraphQLMutationResult
  true: () => Promise<GraphQLMutationResult>
  false: () => GraphQLMutationResult
}
