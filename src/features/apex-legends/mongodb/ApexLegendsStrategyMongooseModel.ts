import { Schema, model, Model, Document, SchemaTypes } from 'mongoose'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import { ApexLegendsMongooseDocuments } from '../interfaces/index.interface'

@ApexLegendsInjectable()
export class ApexLegendsStrategyMongooseModel {
  private _schema: Schema

  constructor() {
    const Loadout: Schema = new Schema(
      {
        primary: { type: String, required: true },
        secondary: { type: String, required: true }
      },
      { _id: false }
    )

    const Player: Schema = new Schema(
      {
        name: { type: String, required: true },
        legend: { type: String, required: true },
        loadout: { type: Loadout, required: true }
      },
      { _id: false }
    )

    const Team: Schema = new Schema(
      {
        name: String,
        players: {
          type: [ Player ],
          required: true,
          validate: [
            (val: any[]): boolean => val.length === 3,
            '{PATH} has too many players'
          ]
        }
      },
      { _id: false }
    )

    this._schema = new Schema(
      {
        _id: {
          type: SchemaTypes.ObjectId,
          auto: true
        },
        team: {
          type: Team,
          required: true
        }
      },
      { timestamps: true }
    )
  }

  get schema(): Schema {
    return this._schema
  }

  get collection(): Model<
    ApexLegendsMongooseDocuments.Output.IStrategyDocument,
    {}
  > {
    return model('apex_strategy', this._schema, 'apex_strategies')
  }
}
