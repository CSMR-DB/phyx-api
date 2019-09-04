import { MongooseModelCSGOItem } from './../features/csgo/mongodb/csgo-item.mongodb.model'
import { csgoItems } from './../features/csgo/data/csgoItems'
import { MongooseModelCSGOMap } from './../features/csgo/mongodb/csgo-map.mongodb.model'
import { csgoMaps } from './../features/csgo/data/csgoMaps'

console.log('Prepopulating CSGO Collections')

beforeEach(async () => {
  await MongooseModelCSGOItem.create(csgoItems)
  await MongooseModelCSGOMap.create(csgoMaps)
})
