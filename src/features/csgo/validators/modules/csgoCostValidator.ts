import {
  ICSGODocuments,
  MongooseDocumentExtensionsCSGO
} from '~src/features/csgo/interfaces'
import { sumArray } from '~src/utils/sumArray'
import { objectToArray } from '~src/utils/objectToArray'
import { IGameDataManager } from '~src/services/gameDataManager'
import {
  IValidator,
  ValidatorReturnType
} from '~src/services/validators/IValidator.interface'
import { isValidated } from '~src/services/validators/modules/isValidated'

export function csgoCostValidator(
  strategy: ICSGODocuments.Strategy,
  gameDataManager: IGameDataManager<
    ICSGODocuments.Item & any | MongooseDocumentExtensionsCSGO.IMongooseItem
  >
): IValidator {
  const { budget }: { budget: number } = strategy

  const errors: Error[] = []

  function validatePlayer(player: ICSGODocuments.Player): ValidatorReturnType {
    const {
      loadout: { primary, secondary, gear, utilities }
    }: ICSGODocuments.Player = player

    function hasOrEmptyFn<T>(item: T | undefined): T {
      return item ? item : (([] as unknown) as T)
    }
    const allPlayerItems: ICSGODocuments.Item[] = [
      hasOrEmptyFn(primary),
      hasOrEmptyFn(secondary),
      ...hasOrEmptyFn(gear),
      ...hasOrEmptyFn(utilities)
    ]

    const allPlayerItemsCost: number[] = allPlayerItems.map(
      ({ internal_id }: { internal_id: string }) =>
        gameDataManager.getField(internal_id, 'cost', 0)
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
    }: ICSGODocuments.Strategy = strategy

    const playersArray: ICSGODocuments.Player[] = objectToArray(players)

    const results: ValidatorReturnType[] = playersArray.map(
      (player: ICSGODocuments.Player) => validatePlayer(player)
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
