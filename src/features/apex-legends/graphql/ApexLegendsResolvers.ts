import { ApexLegendsDatabaseService } from '../services/ApexLegendsDatabaseService'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import {
  IApexLegendsStrategyDocument,
  IApexLegendsItem
} from '../interfaces/index.interface'
import {
  GraphQLMutationResult,
  GraphQLResolversObject,
  MutationScenarios
} from '~src/graphql/shared.types'
import { ApexLegendsStrategyValidator } from './../validators/ApexLegendsStrategyValidator'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { IApexLegend } from './../interfaces/index.interface'

@ApexLegendsInjectable()
export class ApexLegendsResolvers {
  private _errorResponse(error: Error): GraphQLMutationResult {
    return { result: false, errors: [ `${error}` ] }
  }

  private _errorsResponse(errors: Error[]): GraphQLMutationResult {
    return {
      result: false,
      errors: errors.map((error: Error) => `${error}`)
    }
  }

  resolvers: GraphQLResolversObject

  constructor(
    dbService: ApexLegendsDatabaseService,
    strategyValidator: ApexLegendsStrategyValidator
  ) {
    this.resolvers = {
      Query: {
        apexLegendsStrategies: async (): Promise<
          IApexLegendsStrategyDocument[] | null | undefined
        > => await dbService.getStrategies(),

        apexLegendsItems: async (): Promise<IApexLegendsItem[]> =>
          await dbService.getItems(),

        apexLegendsLegends: async (): Promise<IApexLegend[]> =>
          await dbService.getLegends()
      },
      Mutation: {
        createApexLegendsStrategy: async (
          _: any,
          {
            strategy
          }: {
            strategy: IApexLegendsStrategyDocument
          },
          _ctx: any
        ): Promise<GraphQLMutationResult> =>
          await strategyValidator
            .execute(strategy)
            .then(async ({ result, errors }: ValidatorReturnType) => {
              const mutationScenarios: MutationScenarios = {
                true: (): Promise<GraphQLMutationResult> =>
                  dbService.createStrategy({
                    strategy
                  }),
                false: (): GraphQLMutationResult => this._errorsResponse(errors)
              }

              return await mutationScenarios[`${result}`]()
            })
            .catch(this._errorResponse),

        createApexLegendsItem: async (
          _: any,
          { item }: { item: IApexLegendsItem },
          _ctx: any
        ): Promise<GraphQLMutationResult> =>
          await dbService.createItem({ item }),

        createApexLegendsLegend: async (
          _: any,
          { legend }: { legend: IApexLegend },
          _ctx: any
        ): Promise<GraphQLMutationResult> =>
          await dbService.createLegend({ legend })
      }
    }
  }
}
