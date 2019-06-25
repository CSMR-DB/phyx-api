import { Schema, model, Model, SchemaTypes } from 'mongoose'
import { MongooseDocumentExtensionsCSGO } from '../interfaces'
import { idGenerator } from '~src/utils/idGenerator'

const schema: Schema<any> = new Schema(
  {
    _id: {
      type: SchemaTypes.ObjectId,
      auto: true
      // unique: true
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

// schema.pre('save', function(next: Function): void {
//   // tslint:disable-next-line: no-invalid-this
//   const record: MongooseDocumentExtensionsCSGO.IMongooseItem = this as MongooseDocumentExtensionsCSGO.IMongooseItem

//   record._id = idGenerator(record.name!, { uppercase: true })

//   next()
// })

export const MongooseModelCSGOItem: Model<
  MongooseDocumentExtensionsCSGO.IMongooseItem,
  {}
> = model('csgo_item', schema, 'csgo_items')
