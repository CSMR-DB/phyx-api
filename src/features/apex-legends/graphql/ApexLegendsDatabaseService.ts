import { ApexLegendsStrategyMongooseModel } from '../mongodb/ApexLegendsStrategyMongooseModel'
import { Model, Document } from 'mongoose'
import {
  IApexLegendsStrategyDocument,
  IApexLegendsItem,
  IApexLegend,
  ApexLegendsMongooseDocuments
} from '../interfaces/index.interface'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import { MongoError } from 'mongodb'
import { GraphQLMutationResult } from '~src/graphql/shared.types'
import { ApexLegendsItemMongooseModel } from './../mongodb/ApexLegendsItemMongooseModel'
import { ApexLegendsLegendMongooseModel } from '../mongodb/ApexLegendsLegendMongooseModel'

@ApexLegendsInjectable()
export class ApexLegendsDatabaseService {
  private _successResponse(): GraphQLMutationResult {
    return { result: true, errors: [] }
  }
  private _errorResponse(error: MongoError): GraphQLMutationResult {
    return { result: false, errors: [ `${error}` ] }
  }

  private _strategiesCollection: Model<
    ApexLegendsMongooseDocuments.Output.IStrategyDocument,
    {}
  >
  private _itemsCollection: Model<ApexLegendsMongooseDocuments.Output.IItem, {}>
  private _legendsCollection: Model<
    ApexLegendsMongooseDocuments.Output.ILegend,
    {}
  >

  constructor(
    strategyModel: ApexLegendsStrategyMongooseModel,
    itemModel: ApexLegendsItemMongooseModel,
    legendModel: ApexLegendsLegendMongooseModel
  ) {
    this._strategiesCollection = strategyModel.collection
    this._itemsCollection = itemModel.collection
    this._legendsCollection = legendModel.collection
  }

  async getStrategies(): Promise<
    | ApexLegendsMongooseDocuments.Output.IStrategyDocument[]
    | GraphQLMutationResult
  > {
    return await this._strategiesCollection
      .find({})
      .exec()
      .then(
        (docs: ApexLegendsMongooseDocuments.Output.IStrategyDocument[]) => docs
      )
      .catch(this._errorResponse)
  }

  async getItems(): Promise<
    ApexLegendsMongooseDocuments.Output.IItem[] | GraphQLMutationResult
  > {
    return await this._itemsCollection
      .find({})
      .exec()
      .then((docs: ApexLegendsMongooseDocuments.Output.IItem[]) => docs)
      .catch(this._errorResponse)
  }

  async getLegends(): Promise<
    ApexLegendsMongooseDocuments.Output.ILegend[] | GraphQLMutationResult
  > {
    return await this._legendsCollection
      .find({})
      .exec()
      .then((docs: ApexLegendsMongooseDocuments.Output.ILegend[]) => docs)
      .catch(this._errorResponse)
  }

  async createStrategy({
    strategy
  }: {
    strategy: IApexLegendsStrategyDocument
  }): Promise<GraphQLMutationResult> {
    return await this._strategiesCollection
      .create(strategy)
      .then(this._successResponse)
      .catch(this._errorResponse)
  }

  async createItem({
    item
  }: {
    item: IApexLegendsItem
  }): Promise<GraphQLMutationResult> {
    return await this._itemsCollection
      .create(item)
      .then(this._successResponse)
      .catch(this._errorResponse)
  }

  async createLegend({
    legend
  }: {
    legend: IApexLegend
  }): Promise<GraphQLMutationResult> {
    return await this._legendsCollection
      .create(legend)
      .then(this._successResponse)
      .catch(this._errorResponse)
  }
}
