import { Schema, model, Model, Document } from 'mongoose'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import { idGenerator } from '~src/utils/idGenerator'
import { ApexLegendsMongooseDocuments } from '../interfaces/index.interface'

@ApexLegendsInjectable()
export class ApexLegendsItemMongooseModel {
  private _schema: Schema

  constructor() {
    this._schema = new Schema(
      {
        _id: {
          type: String,
          auto: false
        },
        name: {
          type: String,
          required: true,
          unique: true
        },
        class: {
          type: String,
          enum: [ 'SMG', 'LMG', 'AR', 'DMR', 'SHOTGUN', 'PISTOL' ],
          required: true
        },
        ammo_type: {
          type: String,
          enum: [ 'light', 'heavy', 'shotgun', 'energy' ],
          required: true
        }
      },
      { timestamps: true }
    )

    this._schema.pre('save', function(
      this: { name: string } & Document,
      next: Function
    ): void {
      this._id = idGenerator(this.name, { uppercase: true })

      next()
    })
  }

  get schema(): Schema {
    return this._schema
  }

  get collection(): Model<ApexLegendsMongooseDocuments.Output.IItem, {}> {
    return model('apex_item', this._schema, 'apex_items')
  }
}
