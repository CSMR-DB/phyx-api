import { Schema, model } from 'mongoose'

const Item = new Schema({
  internal_id: String
})

const Loadout = new Schema({
  cost: Number,
  secondary: {
    type: Item,
    required: true
  },
  primary: Item,
  gear: [ Item ],
  utilities: [ Item ]
})

const Position = new Schema({
  x: Number,
  y: Number
})

const Player = (color: String) =>
  new Schema({
    internal_id: String,
    color: {
      type: String,
      default: color
    },
    name: { type: String, required: true, maxlength: 24 },
    role: {
      type: String,
      enum: [ 'AWPer', 'Support', 'Entry Fragger', 'Lurker', 'IGL' ],
      default: 'Support'
    },
    loadout: Loadout,
    positions: { type: [ Position ], required: true }
  })

const Players = new Schema({
  player_1: { type: Player('blue'), required: true },
  player_2: { type: Player('purple'), required: true },
  player_3: { type: Player('green'), required: true },
  player_4: { type: Player('orange'), required: true },
  player_5: { type: Player('yellow'), required: true }
})

const Team = new Schema({
  team_id: String,
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  players: { type: Players, required: true }
})

const schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
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
})

export const MongooseModelCSGOStrategy = model('csgo', schema, 'csgo')
