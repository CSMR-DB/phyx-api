import { IPosition } from '../../interfaces/IStrategy.interface'

export interface ISiegeItem {
  internal_id: string
  name?: string
  organization?: string
}

export interface ISiegeGadget {
  internal_id: string
  name?: string
  deployable?: boolean
  deployed_at: [number, number, number][] | number[][]
}

export interface ISiegeAbility {
  internal_id: string
  name?: string
}

export interface ISiegeOperator {
  internal_id: string
  name?: string
  primary: ISiegeItem
  secondary: ISiegeItem
  utility: ISiegeItem
  gadget: ISiegeGadget
  ability?: ISiegeAbility
}

export interface ISiegePlayer {
  [key: string]: any

  internal_id: string
  name: string
  role: string
  operator: ISiegeOperator
  positions: IPosition[]
  reinforced: string[]
}

export interface ISiegePlayers {
  [key: string]: any

  player_1: ISiegePlayer
  player_2: ISiegePlayer
  player_3: ISiegePlayer
  player_4: ISiegePlayer
  player_5: ISiegePlayer
}

export interface ISiegeTeam {
  team_id?: string
  name: string
  players: ISiegePlayers
}

export interface ISiegeStrategy {
  id: string
  name: string
  side: string
  description: string
  map: string
  mode: string
  location: string
  team: ISiegeTeam
}
