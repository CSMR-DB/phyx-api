import { objectToArray } from '~src/utils/objectToArray'
import { ICSGOStrategyDocument } from '~src/features/csgo/interfaces/ICSGOStrategyDocument.interface'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'

export function csgoStrategyDataTransposer(
  strategy: ICSGOStrategyDocument.Strategy
): IStrategyDataTransposer {
  const {
    team: { players }
  }: {
    team: {
      players: ICSGOStrategyDocument.Players
    }
  } = strategy

  const playersArray: ICSGOStrategyDocument.Player[] = objectToArray(players)
  const loadoutArray: ICSGOStrategyDocument.Loadout[] = playersArray.map(
    (player: ICSGOStrategyDocument.Player) => player['loadout']
  )

  function uniqueIDs(): ICSGOStrategyDocument.Item['internal_id'][] {
    const items: ICSGOStrategyDocument.Item[] = loadoutArray
      .map((loadout: ICSGOStrategyDocument.Loadout) => [
        loadout.primary || ({} as ICSGOStrategyDocument.Item),
        loadout.secondary,
        ...(loadout.gear || ([] as ICSGOStrategyDocument.Item[])),
        ...(loadout.utilities || ([] as ICSGOStrategyDocument.Item[]))
      ])
      .reduce(
        (pV: ICSGOStrategyDocument.Item[], cV: ICSGOStrategyDocument.Item[]) =>
          pV.concat(cV)
      )

    const ids: ICSGOStrategyDocument.Item['internal_id'][] = items.map(
      ({ internal_id }: ICSGOStrategyDocument.Item) => internal_id
    )

    return Array.from(new Set(ids))
  }

  type SlotObject = {
    internal_id: string
    slot: string
  }

  function slots(): SlotObject[] {
    const items: SlotObject[] = loadoutArray.map(
      (loadout: ICSGOStrategyDocument.Loadout) => ({
        slot: 'secondary',
        internal_id: loadout.secondary.internal_id
      })
    )

    loadoutArray.map((loadout: ICSGOStrategyDocument.Loadout) => {
      if (loadout.primary) {
        items.push({
          slot: 'primary',
          internal_id: loadout.primary.internal_id
        })
      }

      if (loadout.gear) {
        loadout.gear.map((item: ICSGOStrategyDocument.Item) => {
          if (item) {
            items.push({
              slot: 'gear',
              internal_id: item.internal_id
            })
          }
        })
      }
      if (loadout.utilities) {
        loadout.utilities.map((item: ICSGOStrategyDocument.Item) => {
          if (item) {
            items.push({
              slot: 'utilities',
              internal_id: item.internal_id
            })
          }
        })
      }
    })

    return Array.from(new Set(items.filter((item: SlotObject) => item)))
  }

  return Object.freeze({
    uniqueIDs: uniqueIDs(),
    slots: slots(),
    map: strategy.map,
    side: strategy.side,
    budget: strategy.budget
  })
}
