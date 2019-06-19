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
    mode: {
      type: String,
      enum: [ 'de', 'hs' ],
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
)

export const MongooseModelCSGOMap: Model<Document, {}> = model(
  'csgo_map',
  schema,
  'csgo_maps'
)
