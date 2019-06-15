type StratSide = 'ATK' | 'DEF'
type ItemSide = StratSide | 'UNI'

interface IPosition {
  x: number
  y: number
}

export interface ICSGOItem {
  [key: string]: any

  internal_id: string
  name?: string
  side?: string
  cost?: number
}

export interface ICSGOLoadout {
  gear?: ICSGOItem[]
  primary?: ICSGOItem
  secondary: ICSGOItem
  utilities?: ICSGOItem[]
}

export interface ICSGOPlayer {
  name: string
  role: string
  color: string
  loadout: ICSGOLoadout
  positions: IPosition[]
}

export interface ICSGOPlayers {
  [key: string]: ICSGOPlayer

  player_1: ICSGOPlayer
  player_2: ICSGOPlayer
  player_3: ICSGOPlayer
  player_4: ICSGOPlayer
  player_5: ICSGOPlayer
}

export interface ICSGOTeam {
  team_id?: string
  name: string
  players: ICSGOPlayers
}

export interface ICSGOStrategy {
  name: string
  side: string
  description?: string
  map: string
  budget: number
  team: ICSGOTeam
}
