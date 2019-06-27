import { ICSGODocuments } from '~src/features/csgo/interfaces'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'

export function csgoStrategyDataTransposer(
  strategy: ICSGODocuments.Input.Strategy
): IStrategyDataTransposer {
  const {
    team: { players }
  }: ICSGODocuments.Input.Strategy = strategy

  const loadoutArray: ICSGODocuments.Input.Loadout[] = players.map(
    (player: ICSGODocuments.Input.Player) => player['loadout']
  )

  function uniqueIDs(): string[] {
    const items: string[] = loadoutArray
      .map((loadout: ICSGODocuments.Input.Loadout) => [
        loadout.primary || ({} as string),
        loadout.secondary,
        ...(loadout.gear || ([] as string[])),
        ...(loadout.utilities || ([] as string[]))
      ])
      .reduce((pV: string[], cV: string[]) => pV.concat(cV))

    const ids: string[] = items.map((item: string) => item)

    return Array.from(new Set(ids))
  }

  type SlotObject = {
    internal_id: string
    slot: string
  }

  function slots(): SlotObject[] {
    const items: SlotObject[] = loadoutArray.map(
      (loadout: ICSGODocuments.Input.Loadout) => ({
        slot: 'secondary',
        internal_id: loadout.secondary
      })
    )

    loadoutArray.map((loadout: ICSGODocuments.Input.Loadout) => {
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
