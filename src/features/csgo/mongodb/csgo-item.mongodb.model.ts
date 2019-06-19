import { Schema, model, Model, Document, SchemaTypes } from 'mongoose'

const schema: Schema<any> = new Schema(
  {
    _id: {
      type: SchemaTypes.ObjectId,
      auto: true
    },
    internal_id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    side: {
      type: String,
      enum: [ 'ATK', 'DEF', 'UNI' ],
      required: true
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
      max: 16000
    },
    slot: {
      type: String,
      enum: [ 'primary', 'secondary', 'gear', 'utilities' ],
      required: true
    }
  },
  { timestamps: true }
)

export const MongooseModelCSGOItem: Model<Document, {}> = model(
  'csgo_item',
  schema,
  'csgo_items'
)
