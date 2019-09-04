import { MongooseModelCSGOItem } from '../mongodb/csgo-item.mongodb.model';
import { csgoItems } from '../data/csgoItems'
import { MongooseModelCSGOMap } from '../mongodb/csgo-map.mongodb.model'
import { csgoMaps } from '../data/csgoMaps'

beforeEach(async () => {
  await MongooseModelCSGOItem.create(csgoItems)
  await MongooseModelCSGOMap.create(csgoMaps)
})
