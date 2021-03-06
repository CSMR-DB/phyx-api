import { Schema, model, Model, Document } from 'mongoose'
import { MongooseDocumentExtensionsCSGO } from '../interfaces'
import { idGenerator } from '~src/utils/idGenerator'

const schema: Schema<any> = new Schema(
  {
    _id: {
      type: String,
      auto: false
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

schema.pre('save', function(
  this: MongooseDocumentExtensionsCSGO.Input.IMongooseItem,
  next: Function
): void {
  this._id = idGenerator(this.name, { uppercase: true })

  next()
})

export const MongooseModelCSGOItem: Model<
  MongooseDocumentExtensionsCSGO.Output.IMongooseItem & Document,
  {}
> = model('csgo_item', schema, 'csgo_items')
