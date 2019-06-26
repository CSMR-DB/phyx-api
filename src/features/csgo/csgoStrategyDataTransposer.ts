import { ICSGODocuments } from '~src/features/csgo/interfaces'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'

export function csgoStrategyDataTransposer(
  strategy: ICSGODocuments.Strategy
): IStrategyDataTransposer {
  const {
    team: { players }
  }: {
    team: {
      players: ICSGODocuments.Player[]
    }
  } = strategy

  // const playersArray: ICSGODocuments.Player[] = objectToArray(players)
  const loadoutArray: ICSGODocuments.Loadout[] = players.map(
    (player: ICSGODocuments.Player) => player['loadout']
  )

  function uniqueIDs(): ICSGODocuments.Item['internal_id'][] {
    const items: ICSGODocuments.Item['internal_id'][] = loadoutArray
      .map((loadout: ICSGODocuments.Loadout) => [
        loadout.primary || ({} as ICSGODocuments.Item['internal_id']),
        loadout.secondary,
        ...(loadout.gear || ([] as ICSGODocuments.Item['internal_id'][])),
        ...(loadout.utilities || ([] as ICSGODocuments.Item['internal_id'][]))
      ])
      .reduce((pV: string[], cV: string[]) => pV.concat(cV))

    const ids: ICSGODocuments.Item['internal_id'][] = items.map(
      (item: string) => item
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
        internal_id: loadout.secondary
      })
    )

    loadoutArray.map((loadout: ICSGODocuments.Loadout) => {
      if (loadout.primary) {
        items.push({
          slot: 'primary',
          internal_id: loadout.primary
        })
      }

      if (loadout.gear) {
        loadout.gear.map((id: string) => {
          if (id) {
            items.push({
              slot: 'gear',
              internal_id: id
            })
          }
        })
      }
      if (loadout.utilities) {
        loadout.utilities.map((id: string) => {
          if (id) {
            items.push({
              slot: 'utilities',
              internal_id: id
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
