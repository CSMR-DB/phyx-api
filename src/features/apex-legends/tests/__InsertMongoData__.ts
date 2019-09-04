import { ApexLegendsContainer } from './../di/ApexLegendsDI';
import { apexLegends } from '../data/apexLegends';
import { ApexLegendsLegendMongooseModel } from '../mongodb/ApexLegendsLegendMongooseModel';
import { apexItems } from '../data/apexItems';
import { ApexLegendsItemMongooseModel } from '../mongodb/ApexLegendsItemMongooseModel';
import { model, Model } from 'mongoose';
import { ApexLegendsMongooseDocuments } from '../interfaces/index.interface';

const itemModel: Model<ApexLegendsMongooseDocuments.Output.IItem, {}> = model('apex_item') || ApexLegendsContainer.resolve(ApexLegendsItemMongooseModel).collection
const legendModel: Model<ApexLegendsMongooseDocuments.Output.ILegend, {}> = model('apex_legend') || ApexLegendsContainer.resolve(ApexLegendsLegendMongooseModel).collection

console.log('Inserting Apex Legends data to MongoDB instance')

beforeEach(async () => {
    await itemModel.create(apexItems)
    await legendModel.create(apexLegends)
})