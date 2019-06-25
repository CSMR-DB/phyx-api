import { IPosition } from '~src/interfaces/IStrategy.interface'
import { Document } from 'mongoose'

export namespace ICSGODocuments {
  export type Map = {
    internal_id: string
    name: string
    mode: 'de' | 'hs'
    active: boolean
  }

  export type NewMap = {
    name: Map['name']
    mode: Map['mode']
    active: Map['active']
  }

  export type Item = {
    [key: string]: any

    internal_id: string
    name?: string
    side?: string
    cost?: number
    slot?: string
  }

  export type NewItem = {
    name: NonNullable<Item['name']>
    side: NonNullable<Item['side']>
    cost: NonNullable<Item['cost']>
    slot: NonNullable<Item['slot']>
  }

  export type Loadout = {
    gear?: Item[]
    primary?: Item
    secondary: Item
    utilities?: Item[]
  }

  export type Player = {
    name: string
    role: string
    color: string
    loadout: Loadout
    positions: IPosition[]
  }

  export type Players = {
    [key: string]: Player

    player_1: Player
    player_2: Player
    player_3: Player
    player_4: Player
    player_5: Player
  }

  export type Team = {
    team_id?: string
    name: string
    players: Players
  }

  export type Strategy = {
    name: string
    side: string
    description?: string
    map: string
    budget: number
    team: Team
  }
}

export namespace MongooseDocumentExtensionsCSGO {
  export interface IMongooseStrategy extends ICSGODocuments.Strategy, Document {
    createdAt: string
    updatedAt: string
  }

  export interface IMongooseMap extends ICSGODocuments.Map, Document {}

  export interface IMongooseItem extends ICSGODocuments.Item, Document {}
}
