import { CSGO } from './dataFactory'
import { idGenerator } from '~src/utils/idGenerator'

describe('CSGOFACTORY', () => {
  const CSGOFACTORY: CSGO.IDataFactory = CSGO.dataFactory({
    idGenerator: idGenerator
  })

  beforeAll(() => {
    CSGOFACTORY.addMap('Mirage', true)

    CSGOFACTORY.addItem('ATK', 'Glock-18', 0, 'secondary')

    CSGOFACTORY.addItem('UNI', 'Frag Grenade', 300, 'utilities')
  })

  test('should correctly add a new item', () => {
    CSGOFACTORY.addItem('ATK', 'Bubblegum AWP', 420, 'primary', 'rifle')

    expect(CSGOFACTORY.getItemByID('BUBBLEGUMAWP')).toEqual({
      categories: [ 'weapon', 'rifle' ],
      cost: 420,
      internal_id: 'BUBBLEGUMAWP',
      name: 'Bubblegum AWP',
      side: 'ATK',
      slot: 'primary'
    })
  })

  test('should include Mirage as a map', () => {
    expect(CSGOFACTORY.getMapByID('MIRAGE')).toEqual({
      internal_id: 'MIRAGE',
      name: 'Mirage',
      official: true
    })
  })

  test('should not include Consulate as a map', () => {
    expect(CSGOFACTORY.getMapByID('CONSULATE')).toEqual(undefined)
  })

  test('should include Glock-18 as an item', () => {
    expect(CSGOFACTORY.getItemByID('GLOCK18')).toEqual({
      categories: [ 'weapon', 'pistol' ],
      cost: 0,
      internal_id: 'GLOCK18',
      name: 'Glock-18',
      side: 'ATK',
      slot: 'secondary'
    })
  })

  test('should include FRAGGRENADE as an item', () => {
    expect(CSGOFACTORY.getItemByID('FRAGGRENADE')).toEqual({
      categories: [ 'utilities' ],
      cost: 300,
      internal_id: 'FRAGGRENADE',
      name: 'Frag Grenade',
      side: 'UNI',
      slot: 'utilities'
    })
  })

  test('should not include a Peacekeeper as an item', () => {
    expect(CSGOFACTORY.getItemByID('PEACEKEEPER')).toEqual(undefined)
  })
})
