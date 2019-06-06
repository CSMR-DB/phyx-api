import { idGenerator } from '~src/utils/idGenerator'

namespace GENERIC {
  interface IDataFactory<MapType, EquipmentType> {
    ADD_MAP: (obj: MapType) => void
    ADD_EQUIPMENT: (obj: EquipmentType) => void
    getAllMaps: () => MapType[]
    getAllEquipment: () => EquipmentType[]
  }

  export function DATAFACTORY<MapType, EquipmentType>(): Required<
    IDataFactory<MapType, EquipmentType>
  > {
    const LOCAL_INVENTORY: { EQUIPMENT: EquipmentType[]; MAPS: MapType[] } = {
      EQUIPMENT: [],
      MAPS: []
    }

    function ADD_MAP(obj: MapType): void {
      LOCAL_INVENTORY.MAPS.push(obj)
    }

    function ADD_EQUIPMENT(obj: EquipmentType): void {
      LOCAL_INVENTORY.EQUIPMENT.push(obj)
    }

    function getAllMaps(): MapType[] {
      // DataService.getMaps()
      return LOCAL_INVENTORY.MAPS
    }

    function getAllEquipment(): EquipmentType[] {
      // DataService.getEquipment()
      return LOCAL_INVENTORY.EQUIPMENT
    }

    return Object.freeze({
      ADD_MAP,
      ADD_EQUIPMENT,
      getAllMaps,
      getAllEquipment
    })
  }
}

export namespace CSGO {
  interface IName {
    name: string
  }

  interface IID {
    id: string
  }

  interface ICost {
    cost: number
  }

  interface ISide {
    side: string
  }

  type NameID = Required<IName & IID>

  export type Map = Required<NameID>

  export type Equipment = Required<NameID & ICost & ISide>

  export const BLUEPRINTS = {
    MAP: (name: string) => ({
      name,
      id: idGenerator(name, { uppercase: true })
    }),
    EQUIPMENT: (name: string, cost: number, side: string) => ({
      name,
      id: idGenerator(name, { uppercase: true }),
      cost,
      side
    })
  }
}

// IS Singleton? Exporting a single instance without allowing the factory function to be exported generates a single instance to be used
export const CSGOFACTORYFN = GENERIC.DATAFACTORY<CSGO.Map, CSGO.Equipment>()

CSGOFACTORYFN.ADD_MAP({ name: 'Inferno', id: 'INFERNO' })
CSGOFACTORYFN.ADD_MAP(CSGO.BLUEPRINTS.MAP('Dust 2'))

CSGOFACTORYFN.ADD_EQUIPMENT(CSGO.BLUEPRINTS.EQUIPMENT('Glock-18', 0, 'ATK'))
CSGOFACTORYFN.ADD_EQUIPMENT({
  name: 'SSG-01',
  id: 'SSG01',
  cost: 1700,
  side: 'UNI'
})
// console.log(CSGOFACTORYFN.getAllMaps(), CSGOFACTORYFN.getAllEquipment())
