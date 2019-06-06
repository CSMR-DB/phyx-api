import { IPosition } from '../../interfaces/IStrategy.interface'

export interface IR6SiegeItem {
  internal_id: string
  name?: string
  organization?: string
}

export interface IR6SiegeGadget {
  internal_id: string
  name?: string
  deployable?: boolean
  deployed_at: [number, number, number][] | number[][]
}

export interface IR6SiegeAbility {
  internal_id: string
  name?: string
}

export interface IR6SiegeOperator {
  internal_id: string
  name?: string
  primary: IR6SiegeItem
  secondary: IR6SiegeItem
  utility: IR6SiegeItem
  gadget: IR6SiegeGadget
  ability?: IR6SiegeAbility
}

export interface IR6SiegePlayer {
  [key: string]: any

  internal_id: string
  name: string
  role: string
  operator: IR6SiegeOperator
  positions: IPosition[]
  reinforced: string[]
}

export interface IR6SiegePlayers {
  [key: string]: any

  player_1: IR6SiegePlayer
  player_2: IR6SiegePlayer
  player_3: IR6SiegePlayer
  player_4: IR6SiegePlayer
  player_5: IR6SiegePlayer
}

export interface IR6SiegeTeam {
  team_id?: string
  name: string
  players: IR6SiegePlayers
}

export interface IR6SiegeStrategy {
  id: string
  name: string
  side: string
  description: string
  map: string
  mode: string
  location: string
  team: IR6SiegeTeam
}
