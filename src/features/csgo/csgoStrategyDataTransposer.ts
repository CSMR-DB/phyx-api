import { objectToArray } from '~src/utils/objectToArray'
import { ICSGODocuments } from '~src/features/csgo/interfaces'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'

export function csgoStrategyDataTransposer(
  strategy: ICSGODocuments.Strategy
): IStrategyDataTransposer {
  const {
    team: { players }
  }: {
    team: {
      players: ICSGODocuments.Players
    }
  } = strategy

  const playersArray: ICSGODocuments.Player[] = objectToArray(players)
  const loadoutArray: ICSGODocuments.Loadout[] = playersArray.map(
    (player: ICSGODocuments.Player) => player['loadout']
  )

  function uniqueIDs(): ICSGODocuments.Item['internal_id'][] {
    const items: ICSGODocuments.Item[] = loadoutArray
      .map((loadout: ICSGODocuments.Loadout) => [
        loadout.primary || ({} as ICSGODocuments.Item),
        loadout.secondary,
        ...(loadout.gear || ([] as ICSGODocuments.Item[])),
        ...(loadout.utilities || ([] as ICSGODocuments.Item[]))
      ])
      .reduce(
        (pV: ICSGODocuments.Item[], cV: ICSGODocuments.Item[]) =>
          pV.concat(cV)
      )

    const ids: ICSGODocuments.Item['internal_id'][] = items.map(
      ({ internal_id }: ICSGODocuments.Item) => internal_id
    )

    return Array.from(new Set(ids))
  }

  type SlotObject = {
    internal_id: string
    slot: string
  }

  function slots(): SlotObject[] {
    const items: SlotObject[] = loadoutArray.map(
      (loadout: ICSGODocuments.Loadout) => ({
        slot: 'secondary',
        internal_id: loadout.secondary.internal_id
      })
    )

    loadoutArray.map((loadout: ICSGODocuments.Loadout) => {
      if (loadout.primary) {
        items.push({
          slot: 'primary',
          internal_id: loadout.primary.internal_id
        })
      }

      if (loadout.gear) {
        loadout.gear.map((item: ICSGODocuments.Item) => {
          if (item) {
            items.push({
              slot: 'gear',
              internal_id: item.internal_id
            })
          }
        })
      }
      if (loadout.utilities) {
        loadout.utilities.map((item: ICSGODocuments.Item) => {
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
