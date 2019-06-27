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

schema.pre('save', function(
  this: MongooseDocumentExtensionsCSGO.Input.IMongooseItem,
  next: Function
): void {
  this._id = idGenerator(this.name, { uppercase: true })

  next()
})

export const MongooseModelCSGOMap: Model<
  MongooseDocumentExtensionsCSGO.Output.IMongooseMap & Document,
  {}
> = model('csgo_map', schema, 'csgo_maps')
