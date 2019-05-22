import { R6SIEGE } from './r6siege.factory'
import { idGenerator } from '~src/utils/idGenerator'

describe('R6SIEGEFACTORY', () => {
  const R6SIEGEFACTORY = R6SIEGE.DATAFACTORY({ idGenerator: idGenerator })

  beforeAll(() => {
    R6SIEGEFACTORY.addItem('G36-C', 'primary', 'AR')
    R6SIEGEFACTORY.addMap('Consulate', true, [ [ 'WA_01', true ] ], [ 'DO_01' ], [ 'WI_01' ])
    R6SIEGEFACTORY.addOperator('ATK', 'Sledge', 'SAS', [ 'L85A2' ], [ 'P226MK25' ], [ 'FRAGGRENADE' ], [ 'The Caber', false, 25 ])
  })

  test('should correctly add a new item', () => {
    R6SIEGEFACTORY.addItem('L85A2', 'primary', 'AR')

    expect(R6SIEGEFACTORY.getItemByID('L85A2')).toEqual({
      categories: [ 'weapon', 'AR' ],
      internal_id: 'L85A2',
      name: 'L85A2',
      slot: 'primary'
    })
  })

  test('should include Consulate as a map', () => {
    expect(R6SIEGEFACTORY.getMapByID('CONSULATE')).toEqual({
      internal_id: 'CONSULATE',
      name: 'Consulate',
      official: true,
      walls: [ { internal_id: 'WA_01', reinforceable: true } ],
      doorways: [ 'DO_01' ],
      windows: [ 'WI_01' ]
    })
  })

  test('should not include Mirage as a map', () => {
    expect(R6SIEGEFACTORY.getMapByID('MIRAGE')).toEqual(undefined)
  })

  test('should include G36C as an item', () => {
    expect(R6SIEGEFACTORY.getItemByID('G36C')).toEqual({
      categories: [ 'weapon', 'AR' ],
      internal_id: 'G36C',
      name: 'G36-C',
      slot: 'primary'
    })
  })

  test('should not include a Peacekeeper as an item', () => {
    expect(R6SIEGEFACTORY.getItemByID('PEACEKEEPER')).toEqual(undefined)
  })

  test('should correctly add a new Operator', () => {
    R6SIEGEFACTORY.addOperator('ATK', 'Ash', 'SWAT', [ 'G36C' ], [ '57USG' ], [ 'STUNGRENADE' ], [ 'M120 CREM', true, 2 ])

    expect(R6SIEGEFACTORY.getOperatorByID('ASH')).toEqual({
      side: 'ATK',
      name: 'Ash',
      internal_id: 'ASH',
      organization: 'SWAT',
      primaries: [ 'G36C' ],
      secondaries: [ '57USG' ],
      utilities: [ 'STUNGRENADE' ],
      gadget: { name: 'M120 CREM', internal_id: 'M120CREM', deployable: true, count: 2 }
    })
  })

  test('should include Sledge as an Operator', () => {
    expect(R6SIEGEFACTORY.getOperatorByID('SLEDGE')).toEqual({
      side: 'ATK',
      name: 'Sledge',
      internal_id: 'SLEDGE',
      organization: 'SAS',
      primaries: [ 'L85A2' ],
      secondaries: [ 'P226MK25' ],
      utilities: [ 'FRAGGRENADE' ],
      gadget: { name: 'The Caber', internal_id: 'THECABER', deployable: false, count: 25 }
    })
  })

  test('should not include Caustic as an operator', () => {
    expect(R6SIEGEFACTORY.getOperatorByID('CAUSTIC')).toEqual(undefined)
  })
})
