import {
  ICSGODocuments,
  MongooseDocumentExtensionsCSGO
} from '~src/features/csgo/interfaces'
import { sumArray } from '~src/utils/sumArray'
import { IGameDataManager } from '~src/services/gameDataManager'
import {
  IValidator,
  ValidatorReturnType
} from '~src/services/validators/IValidator.interface'
import { isValidated } from '~src/services/validators/modules/isValidated'

export function csgoCostValidator(
  strategy: ICSGODocuments.Input.Strategy,
  gameDataManager: IGameDataManager<
    | ICSGODocuments.Output.Item
    | MongooseDocumentExtensionsCSGO.Output.IMongooseItem
  >
): IValidator {
  const { budget }: ICSGODocuments.Input.Strategy = strategy

  const errors: Error[] = []

  function validatePlayer(
    player: ICSGODocuments.Input.Player
  ): ValidatorReturnType {
    const {
      loadout: { primary, secondary, gear, utilities }
    }: ICSGODocuments.Input.Player = player

    function hasOrEmptyFn<T>(item: T | undefined): T {
      return item ? item : (([] as unknown) as T)
    }
    const allPlayerItems: ICSGODocuments.Output.Item['internal_id'][] = [
      hasOrEmptyFn(primary),
      hasOrEmptyFn(secondary),
      ...hasOrEmptyFn(gear),
      ...hasOrEmptyFn(utilities)
    ]

    const allPlayerItemsCost: number[] = allPlayerItems.map(
      (id: ICSGODocuments.Output.Item['internal_id']) =>
        gameDataManager.getField(id, 'cost', 0)
    )

    const totalPlayerCost: number = sumArray(allPlayerItemsCost)

    const withinBudget: boolean = totalPlayerCost <= budget

    if (!withinBudget) {
      errors.push(
        new Error(`${player.name} has spent too much on their loadout`)
      )
    }

    return { result: withinBudget, errors }
  }

  async function execute(): Promise<ValidatorReturnType> {
    const {
      team: { players }
    }: ICSGODocuments.Input.Strategy = strategy

    const results: ValidatorReturnType[] = players.map(
      (player: ICSGODocuments.Input.Player) => validatePlayer(player)
    )

    return await {
      result: isValidated(
        results.map(({ result }: { result: boolean }): boolean => result)
      ),
      errors
    }
  }

  return Object.freeze({ execute, errors })
}
