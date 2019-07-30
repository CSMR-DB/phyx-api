import { Schema, model, Model, Document } from 'mongoose'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import { idGenerator } from '~src/utils/idGenerator'
import { ApexLegendsMongooseDocuments } from '../interfaces/index.interface'

@ApexLegendsInjectable()
export class ApexLegendsLegendMongooseModel {
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
          enum: [ 'OFFENSIVE', 'DEFENSIVE', 'SUPPORT', 'SCOUT' ],
          required: true
        },
        tactical: {
          type: String,
          required: true
        },
        ultimate: {
          type: String,
          required: true
        },
        passive: {
          type: String,
          required: false
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

  get collection(): Model<ApexLegendsMongooseDocuments.Output.ILegend, {}> {
    return model('apex_legend', this._schema, 'apex_legends')
  }
}
