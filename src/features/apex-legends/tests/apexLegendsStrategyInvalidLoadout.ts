import { IApexLegendsStrategyDocument } from '../interfaces/index.interface'

export const apexLegendsStrategyInvalidLoadout: IApexLegendsStrategyDocument = {
  name: 'Smoke & Poke',
  team: {
    name: 'EL EM AYO',
    players: [
      {
        name: 'PHYD',
        legend: 'WATTSON',
        loadout: {
          primary: 'MASTIVE',
          secondary: 'LONGBOW',
          grenades: 4,
          arcStars: 4
        }
      },
      {
        name: 'NOTPHYD',
        legend: 'GIBRALTAR',
        loadout: {
          primary: 'DEVOTION',
          secondary: 'PEACEKEEPER',
          grenades: 4
        }
      },
      {
        name: 'Healyboi',
        legend: 'MONTAGNE',
        loadout: {
          primary: 'SPITFIRE',
          secondary: 'R99',
          grenades: 2,
          arcStars: 2
        }
      }
    ]
  }
}
