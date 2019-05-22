import { gameDataManager, IGameDataManager } from './gameDataManager'
import { Attackers, ALLOPERATORS } from '~src/features/siege/data/siege-operators'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { ICSGOItem } from '~src/features/csgo/interfaces/ICSGOStrategy.interface'

describe('DataManager()', () => {
  const ALLITEMS: ICSGOItem[] = CSGOFACTORY.getItems()

  const testCases = [
    {
      dataToFind: { id: 'GLOCK18', name: 'Glock 18' },
      dataArray: ALLITEMS,
      data: {
        name: 'Glock-18',
        cost: 0,
        side: 'ATK',
        slot: 'secondary',
        internal_id: 'GLOCK18',
        categories: [ 'weapon', 'pistol' ]
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
        internal_id: 'AK47',
        categories: [ 'weapon', 'rifle' ]
      },
      has: true
    },
    { dataToFind: { id: 'AK99' }, dataArray: ALLITEMS, data: undefined, has: false },
    { dataToFind: { id: 'P-2001' }, dataArray: ALLITEMS, data: undefined, has: false },
    {
      dataToFind: { id: 'FRAGGRENADE' },
      dataArray: ALLITEMS,
      data: {
        name: 'Frag Grenade',
        cost: 300,
        side: 'UNI',
        slot: 'utility',
        internal_id: 'FRAGGRENADE',
        categories: [ 'utility' ]
      },
      has: true
    },

    { dataToFind: { id: 'ASH' }, dataArray: ALLOPERATORS, data: Attackers.ASH, has: true },
    { dataToFind: { id: 'USH' }, dataArray: ALLOPERATORS, data: undefined, has: false }
  ]

  test.each(testCases)(`getOneById() should return full item, or undefined`, ({ dataToFind: { id }, dataArray, data }) => {
    const itemsManager: IGameDataManager<ICSGOItem, keyof ICSGOItem> = gameDataManager<ICSGOItem, keyof ICSGOItem>(dataArray)
    expect(itemsManager.getOneById(id)).toEqual(data)
  })

  test.each(testCases)(`has() should return boolean if id exists`, ({ dataToFind: { id }, dataArray, has }) => {
    const itemsManager: IGameDataManager<ICSGOItem, keyof ICSGOItem> = gameDataManager<ICSGOItem, keyof ICSGOItem>(dataArray)
    expect(itemsManager.hasID(id)).toEqual(has)
  })
})
