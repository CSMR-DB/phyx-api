import { Schema, model, Model, SchemaTypes } from 'mongoose'
import { MongooseDocumentExtensionsCSGO, ICSGODocuments } from '../interfaces'

const Loadout: Schema<any> = new Schema(
  {
    secondary: {
      type: String,
      required: true,
      ref: 'csgo_item'
    },
    primary: {
      type: String,
      ref: 'csgo_item'
    },
    gear: [
      {
        type: String,
        ref: 'csgo_item'
      }
    ],
    utilities: [
      {
        type: String,
        ref: 'csgo_item'
      }
    ]
  },
  { _id: false }
)

const Position: Schema<any> = new Schema(
  {
    x: Number,
    y: Number
  },
  { _id: false }
)

const Player: Schema<any> = new Schema(
  {
    internal_id: String,
    color: {
      type: String,
      enum: [ 'blue', 'purple', 'green', 'orange', 'yellow' ]
    },
    name: { type: String, required: true, maxlength: 24 },
    role: {
      type: String,
      enum: [ 'AWPer', 'Support', 'Entry Fragger', 'Lurker', 'IGL' ],
      default: 'Support'
    },
    loadout: Loadout,
    positions: { type: [ Position ], required: true }
  },
  { _id: false }
)

const Team: Schema<any> = new Schema(
  {
    team_id: String,
    name: {
      type: String,
      required: true,
      maxlength: 20
    },
    players: {
      type: [ Player ],
      required: true,
      validate: [
        (val: ICSGODocuments.Player[]): boolean => val.length === 5,
        '{PATH} has too many players'
      ]
    }
  },
  { _id: false }
)

const schema: Schema<any> = new Schema(
  {
    _id: {
      type: SchemaTypes.ObjectId,
      auto: true
    },
    map: {
      type: String,
      required: true
    },
    name: {
      type: String,
      maxlength: 18,
      required: true
    },
    description: String,
    side: {
      type: String,
      enum: [ 'ATK', 'DEF' ],
      required: true
    },
    budget: {
      type: Number,
      min: 0,
      max: 16000,
      required: true
    },
    team: {
      type: Team,
      required: true
    }
  },
  { timestamps: true }
)

export const MongooseModelCSGOStrategy: Model<
  MongooseDocumentExtensionsCSGO.IMongooseStrategy,
  {}
> = model('csgo_strategy', schema, 'csgo_strategies')
