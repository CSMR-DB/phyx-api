import {
  ICSGOStrategy,
  ICSGOPlayer,
  ICSGOItem,
  ICSGOLoadout,
  ICSGOPlayers
} from '~src/features/csgo/interfaces/ICSGOStrategy.interface'
import { sumArray } from '~src/utils/sumArray'
import { objectToArray } from '~src/utils/objectToArray'
import { IGameDataManager } from '~src/services/gameDataManager'
import {
  IValidator,
  ValidatorReturnType
} from '~src/services/validators/IValidator.interface'
import { isValidated } from '~src/services/validators/modules/isValidated'

export function csgoCostValidator(
  strategy: ICSGOStrategy,
  gameDataManager: IGameDataManager<ICSGOItem, keyof ICSGOItem>
): IValidator {
  const { budget }: { budget: number } = strategy

  const errors: Error[] = []

  function validatePlayer(player: ICSGOPlayer): ValidatorReturnType {
    const {
      loadout: { primary, secondary, gear, utilities }
    }: { loadout: ICSGOLoadout } = player

    function hasOrEmptyFn<T>(item: T | undefined): T {
      return item ? item : (([] as unknown) as T)
    }
    const allPlayerItems: ICSGOItem[] = [
      hasOrEmptyFn<ICSGOItem>(primary),
      hasOrEmptyFn<ICSGOItem>(secondary),
      ...hasOrEmptyFn<ICSGOItem[]>(gear),
      ...hasOrEmptyFn<ICSGOItem[]>(utilities)
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
    }: { team: { players: ICSGOPlayers } } = strategy

    const playersArray: ICSGOPlayer[] = objectToArray(players)

    const results: ValidatorReturnType[] = playersArray.map(
      (player: ICSGOPlayer) => validatePlayer(player)
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