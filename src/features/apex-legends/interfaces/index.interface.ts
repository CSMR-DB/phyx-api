import { Document } from 'mongoose'
import { Merge } from '~src/types'

export interface IApexLegendsLoadout {
  primary: string
  secondary: string
  grenades?: number
  arcStars?: number
}

export interface IApexLegendsPlayer {
  name: string
  legend: string
  loadout: IApexLegendsLoadout
}

export interface IApexLegendsTeam {
  name?: string
  players: IApexLegendsPlayer[]
}

export interface IApexLegendsStrategyDocument {
  name: string
  team: IApexLegendsTeam
}

export interface IApexLegend {
  _id: string
  name: string
  class: 'Offensive' | 'Defensive' | 'Support'
  tactical: string
  ultimate: string
}

export interface IApexLegendsItem {
  _id: string
  name: string
  class: string
  ammo_type: string
}

export namespace ApexLegendsMongooseDocuments {
  export namespace Output {
    export interface IStrategyDocument
      extends Document,
        IApexLegendsStrategyDocument {}

    export interface IItem extends Document, IApexLegendsItem {
      _id: IApexLegendsItem['_id']
    }

    export interface ILegend extends Document, IApexLegend {
      _id: IApexLegend['_id']
    }
  }
}
