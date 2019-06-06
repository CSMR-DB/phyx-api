export interface IPosition {
  x: number
  y: number
}

export type StratSide = 'ATK' | 'DEF'
export type ItemSide = StratSide | 'UNI'

export interface IGameItem {
  [key: string]: any

  internal_id: string

  name?: string
  side?: string
}

export interface ILoadout {
  primary?: IGameItem
  secondary?: IGameItem
  utilities?: IGameItem[]
}

export interface IPlayer {
  [key: string]: any

  internal_id: string
  name: string
  role: string
  positions: IPosition[]
}

export interface IPlayers {
  [key: string]: IPlayer

  player_1: IPlayer
  player_2: IPlayer
  player_3: IPlayer
  player_4: IPlayer
  player_5: IPlayer
}

export interface ITeam {
  name: string
  players: IPlayers
}

export interface IStrategy {
  id: string
  map: string
  name: string
  side: string
  team: ITeam

  description?: string
}
