import { IPosition } from '~src/interfaces/IStrategy.interface'
import { Document } from 'mongoose'

export namespace ICSGODocuments {
  export namespace Input {
    // Submitting a new map
    export type Map = {
      name: string
      mode: 'de' | 'hs'
      active: boolean
    }

    // Submitting a new item
    export type Item = {
      name: NonNullable<string>
      side: NonNullable<'ATK' | 'DEF' | 'UNI'>
      cost: NonNullable<number>
      slot: NonNullable<string>
    }

    // Submitting a new strategy
    export type Loadout = {
      gear?: string[]
      primary?: string
      secondary: string
      utilities?: string[]
    }

    export type Player = {
      name: string
      role: string
      color: string
      loadout: Loadout
      positions: IPosition[]
    }

    export type Team = {
      team_id?: string
      name: string
      players: Player[]
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

  export namespace Output {
    // Requesting a map from DB
    export type Map = {
      _id: string
      internal_id: string
      name: string
      mode: 'de' | 'hs'
      active: boolean
    }

    // Requesting an item from DB
    export type Item = {
      [key: string]: any

      _id: string
      internal_id: string
      name?: string
      side?: 'ATK' | 'DEF' | 'UNI'
      cost?: number
      slot?: string
    }

    // Requesting a strategy from DB
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

    export type Team = {
      team_id?: string
      name: string
      players: Player[]
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
}

type Omit<T, K> = { [key in Exclude<keyof T, K>]: T[key] }
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

export namespace MongooseDocumentExtensionsCSGO {
  export namespace Input {
    export interface IMongooseStrategy
      extends ICSGODocuments.Input.Strategy,
        Document {}

    export interface IMongooseMap extends ICSGODocuments.Input.Map, Document {}

    export interface IMongooseItem
      extends ICSGODocuments.Input.Item,
        Document {}
  }

  export namespace Output {
    export interface IMongooseStrategy
      extends ICSGODocuments.Output.Strategy,
        Document {}

    export interface IMongooseMap
      extends ICSGODocuments.Output.Map,
        Merge<Document, ICSGODocuments.Output.Map> {}

    export interface IMongooseItem
      extends ICSGODocuments.Output.Item,
        Merge<Document, ICSGODocuments.Output.Item> {}
  }
}
