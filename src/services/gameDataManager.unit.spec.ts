import { gameDataManager, IGameDataManager } from './gameDataManager'
import {
  Attackers,
  ALLOPERATORS
} from '~src/features/r6siege/data/r6siege-operators'
import { ICSGODocuments } from '~src/features/csgo/interfaces'
import { csgoItems } from '~src/features/csgo/data/csgoItems'

describe('DataManager()', () => {
  const ALLITEMS: ICSGODocuments.Output.Item[] = csgoItems

  const testCases = [
    {
      dataToFind: { id: 'GLOCK18', name: 'Glock 18' },
      dataArray: ALLITEMS,
      data: {
        name: 'Glock-18',
        cost: 0,
        side: 'ATK',
        slot: 'secondary',
        _id: 'GLOCK18',
        internal_id: 'GLOCK18'
      },
      has: true
    },
    {
      dataToFind: { id: 'AK47' },
      dataArray: ALLITEMS,
      data: {
        name: 'AK-47',
        cost: 2700,
        side: 'ATK',
        slot: 'primary',
        _id: 'AK47',
        internal_id: 'AK47'
      },
      has: true
    },
    {
      dataToFind: { id: 'AK99' },
      dataArray: ALLITEMS,
      data: undefined,
      has: false
    },
    {
      dataToFind: { id: 'P-2001' },
      dataArray: ALLITEMS,
      data: undefined,
      has: false
    },
    {
      dataToFind: { id: 'FRAGGRENADE' },
      dataArray: ALLITEMS,
      data: {
        name: 'Frag Grenade',
        cost: 300,
        side: 'UNI',
        slot: 'utilities',
        _id: 'FRAGGRENADE',
        internal_id: 'FRAGGRENADE'
      },
      has: true
    }

    // {
    //   dataToFind: { id: 'ASH' },
    //   dataArray: ALLOPERATORS,
    //   data: Attackers.ASH,
    //   has: true
    // },
    // {
    //   dataToFind: { id: 'USH' },
    //   dataArray: ALLOPERATORS,
    //   data: undefined,
    //   has: false
    // }
  ]

  test.each(testCases)(
    `getOneById() should return full item, or undefined`,
    ({ dataToFind: { id }, dataArray, data }) => {
      const itemsManager: IGameDataManager<
        ICSGODocuments.Output.Item
      > = gameDataManager(dataArray)
      expect(itemsManager.getOneById(id)).toEqual(data)
    }
  )

  test.each(testCases)(
    `has() should return boolean if id exists`,
    ({ dataToFind: { id }, dataArray, has }) => {
      const itemsManager: IGameDataManager<
        ICSGODocuments.Output.Item
      > = gameDataManager(dataArray)
      expect(itemsManager.hasID(id)).toEqual(has)
    }
  )
})
