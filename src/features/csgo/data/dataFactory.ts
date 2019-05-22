import { idGenerator, IIDGenerator } from '~src/utils/idGenerator'

export namespace CSGO {
  type EquipmentSide = Required<'ATK' | 'DEF' | 'UNI'>
  type EquipmentCategory = Required<'weapon' | 'gear' | 'utility' | 'uncategorized'>
  type WeaponCategory = Required<'pistol' | 'rifle' | 'heavy' | 'smg'>
  type EquipmentSlot = Required<'primary' | 'secondary' | 'gear' | 'utility'>

  export interface IMap {
    name: string
    internal_id: string
    official: boolean
  }

  export interface IItem {
    name: string
    internal_id: string
    cost: number
    side: EquipmentSide
    categories: Partial<[EquipmentCategory, WeaponCategory]>
    slot: EquipmentSlot
  }

  export interface ILocalInventory {
    ITEMS: IItem[]
    MAPS: IMap[]
  }

  export interface ILocalInventoryMap {
    ITEMS: Map<string, IItem>
    MAPS: Map<string, IMap>
  }

  export interface IDataFactory {
    addMap: (name: string, official: boolean) => void
    getMaps: () => IMap[]
    getMapByID: (id: string) => IMap | undefined
    addItem: (side: EquipmentSide, name: string, cost: number, slot: EquipmentSlot, category?: WeaponCategory) => void
    getItems: () => IItem[]
    getItemByID: (id: string) => IItem | undefined
    getItemsBySide: (side: EquipmentSide) => IItem[]
  }

  export function dataFactory(options: { idGenerator: IIDGenerator }): Required<IDataFactory> {
    // const LOCAL_INVENTORY: ILocalInventory = Object.freeze({
    //   ITEMS: [],
    //   MAPS: []
    // })

    const LOCAL_INVENTORY_MAP: ILocalInventoryMap = Object.freeze({
      ITEMS: new Map(),
      MAPS: new Map()
    })

    function generateID(name: string): string {
      return options.idGenerator(name, { uppercase: true })
    }

    function addMap(name: string, official: boolean): void {
      const internal_id: string = generateID(name)
      const M: IMap = Object.freeze({ name, official, internal_id })

      // LOCAL_INVENTORY.MAPS.push(M)

      LOCAL_INVENTORY_MAP.MAPS.set(internal_id, M)
    }

    function getMaps(): IMap[] {
      // return LOCAL_INVENTORY.MAPS

      return Array.from(LOCAL_INVENTORY_MAP.MAPS.values())
    }

    function getMapByID(id: string): IMap | undefined {
      // return getMaps().find((map: IMap) => map.internal_id === id)

      return LOCAL_INVENTORY_MAP.MAPS.get(id)
    }

    function categorizer(
      slot: EquipmentSlot,
      category: WeaponCategory | undefined
    ): { categories: Partial<[EquipmentCategory, WeaponCategory]> } {
      const categoryObject: { [key: string]: { categories: Partial<[EquipmentCategory, WeaponCategory]> } } = {
        primary: { categories: [ 'weapon', category! ] },
        secondary: { categories: [ 'weapon', 'pistol' ] },
        gear: { categories: [ 'gear' ] },
        utility: { categories: [ 'utility' ] }
      }

      return categoryObject[slot]
    }

    function addItem(side: EquipmentSide, name: string, cost: number, slot: EquipmentSlot, category?: WeaponCategory): void {
      const internal_id: string = generateID(name)
      const E: IItem = Object.freeze({
        name,
        cost,
        side,
        slot,
        internal_id,
        ...categorizer(slot, category)
      })

      // LOCAL_INVENTORY.ITEMS.push(E)

      LOCAL_INVENTORY_MAP.ITEMS.set(internal_id, E)
    }

    function getItems(): IItem[] {
      // return LOCAL_INVENTORY.ITEMS

      return Array.from(LOCAL_INVENTORY_MAP.ITEMS.values())
    }

    function getItemByID(id: string): IItem | undefined {
      // return getItems().find((item: IItem) => item.internal_id === id)

      return LOCAL_INVENTORY_MAP.ITEMS.get(id)
    }

    function getItemsBySide(side: EquipmentSide): IItem[] {
      return getItems().filter((item: IItem) => item.side === side)
    }

    return Object.freeze({
      addMap,
      getMaps,
      getMapByID,
      addItem,
      getItems,
      getItemByID,
      getItemsBySide
    })
  }
}

const CSGOFACTORY: CSGO.IDataFactory = CSGO.dataFactory({ idGenerator: idGenerator })

CSGOFACTORY.addItem('UNI', 'Dual Berettas', 400, 'secondary')
CSGOFACTORY.addItem('UNI', 'P-250', 300, 'secondary')
CSGOFACTORY.addItem('UNI', 'Desert Eagle', 700, 'secondary')
CSGOFACTORY.addItem('UNI', 'R8 Revolver', 600, 'secondary')
CSGOFACTORY.addItem('UNI', 'CZ-75', 500, 'secondary')
CSGOFACTORY.addItem('ATK', 'Glock-18', 0, 'secondary')
CSGOFACTORY.addItem('ATK', 'Tec-9', 500, 'secondary')
CSGOFACTORY.addItem('DEF', 'USP-S', 0, 'secondary')
CSGOFACTORY.addItem('DEF', 'P-2000', 0, 'secondary')
CSGOFACTORY.addItem('DEF', 'Five-Seven', 500, 'secondary')

CSGOFACTORY.addItem('UNI', 'Nova', 1200, 'primary', 'heavy')
CSGOFACTORY.addItem('UNI', 'XM-1012', 1800, 'primary', 'heavy')
CSGOFACTORY.addItem('UNI', 'Negev', 1750, 'primary', 'heavy')
CSGOFACTORY.addItem('UNI', 'M249', 4150, 'primary', 'heavy')
CSGOFACTORY.addItem('ATK', 'Sawed-off', 1200, 'primary', 'heavy')
CSGOFACTORY.addItem('DEF', 'MAG-7', 1200, 'primary', 'heavy')

CSGOFACTORY.addItem('UNI', 'SSG 08', 1700, 'primary', 'rifle')
CSGOFACTORY.addItem('UNI', 'AWP', 4750, 'primary', 'rifle')
CSGOFACTORY.addItem('ATK', 'AK-47', 2700, 'primary', 'rifle')
CSGOFACTORY.addItem('ATK', 'Galil AR', 2000, 'primary', 'rifle')
CSGOFACTORY.addItem('ATK', 'SG 553', 2750, 'primary', 'rifle')
CSGOFACTORY.addItem('ATK', 'G3SG1', 5150, 'primary', 'rifle')
CSGOFACTORY.addItem('DEF', 'M4A4', 3100, 'primary', 'rifle')
CSGOFACTORY.addItem('DEF', 'M4A1-S', 3100, 'primary', 'rifle')
CSGOFACTORY.addItem('DEF', 'Famas', 2250, 'primary', 'rifle')
CSGOFACTORY.addItem('DEF', 'AUG', 3150, 'primary', 'rifle')
CSGOFACTORY.addItem('DEF', 'SCAR-20', 5150, 'primary', 'rifle')

CSGOFACTORY.addItem('UNI', 'MP7', 1700, 'primary', 'smg')
CSGOFACTORY.addItem('UNI', 'UMP5-SD', 1500, 'primary', 'smg')
CSGOFACTORY.addItem('UNI', 'UMP-45', 1200, 'primary', 'smg')
CSGOFACTORY.addItem('UNI', 'PP-Bizon', 1200, 'primary', 'smg')
CSGOFACTORY.addItem('UNI', 'P-90', 2350, 'primary', 'smg')
CSGOFACTORY.addItem('ATK', 'Mac-10', 1050, 'primary', 'smg')
CSGOFACTORY.addItem('DEF', 'MP9', 1250, 'primary', 'smg')

CSGOFACTORY.addItem('UNI', 'Kevlar', 650, 'gear')
CSGOFACTORY.addItem('UNI', 'Helmet', 350, 'gear')
CSGOFACTORY.addItem('UNI', 'Zeus', 200, 'gear')
CSGOFACTORY.addItem('DEF', 'Defuse Kit', 400, 'gear')

CSGOFACTORY.addItem('UNI', 'Smoke Grenade', 300, 'utility')
CSGOFACTORY.addItem('UNI', 'Flash Grenade', 200, 'utility')
CSGOFACTORY.addItem('UNI', 'Frag Grenade', 300, 'utility')
CSGOFACTORY.addItem('UNI', 'Decoy Grenade', 50, 'utility')
CSGOFACTORY.addItem('ATK', 'Molotov', 400, 'utility')
CSGOFACTORY.addItem('DEF', 'Incendiary Grenade', 600, 'utility')

CSGOFACTORY.addMap('Mirage', true)
CSGOFACTORY.addMap('Inferno', true)
CSGOFACTORY.addMap('Nuke', true)
CSGOFACTORY.addMap('Cache', true)
CSGOFACTORY.addMap('Overpass', true)
CSGOFACTORY.addMap('Cobblestone', false)
CSGOFACTORY.addMap('Dust 2', true)

// console.log(CSGOFACTORY.getItems())

export { CSGOFACTORY }
