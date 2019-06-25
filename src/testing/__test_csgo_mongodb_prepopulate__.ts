import { MongooseModelCSGOItem } from '~src/features/csgo/mongodb/csgo-item.mongodb.model'
import { csgoItems } from '~src/features/csgo/data/csgoItems'
import { MongooseModelCSGOMap } from '~src/features/csgo/mongodb/csgo-map.mongodb.model'
import { csgoMaps } from '~src/features/csgo/data/csgoMaps'

beforeEach(async () => {
  await MongooseModelCSGOItem.create(csgoItems)
  await MongooseModelCSGOMap.create(csgoMaps)
})
