export const csgoStrategyInvalidSlots = {
  map: 'Nuke',
  name: 'Default A',
  description: 'Execute with smokes to CT, Stairs and Connector',
  side: 'ATK',
  budget: 5000,
  team: {
    name: 'NUBBS',
    players: [
      {
        name: 'Zombie',
        role: 'AWPer',
        color: 'blue',
        loadout: {
          primary: 'AWP',
          secondary: 'GLOCK18',
          gear: [],
          utilities: [ 'FLASHGRENADE', 'DECOYGRENADE' ]
        },
        positions: [
          {
            x: 0,
            y: 1
          }
        ]
      },
      {
        name: 'Cookie',
        color: 'purple',
        role: 'Entry Fragger',
        loadout: {
          primary: 'GLOCK18',
          secondary: 'AWP',
          gear: [ 'HELMET', 'KEVLAR' ],
          utilities: [
            'FLASHGRENADE',
            'FLASHGRENADE',
            'FRAGGRENADE',
            'SMOKEGRENADE'
          ]
        },
        positions: [
          {
            x: 0,
            y: 1
          }
        ]
      },
      {
        name: 'Night',
        color: 'green',
        role: 'Entry Fragger',
        loadout: {
          primary: 'AK47',
          secondary: 'GLOCK18',
          gear: [ 'HELMET', 'KEVLAR' ],
          utilities: [
            'FLASHGRENADE',
            'FLASHGRENADE',
            'FRAGGRENADE',
            'SMOKEGRENADE'
          ]
        },
        positions: [
          {
            x: 0,
            y: 1
          }
        ]
      },
      {
        name: 'Alun',
        color: 'orange',
        role: 'Support',
        loadout: {
          primary: 'P90',
          secondary: 'GLOCK18',
          gear: [ 'HELMET', 'KEVLAR' ],
          utilities: [
            'FLASHGRENADE',
            'FLASHGRENADE',
            'DECOYGRENADE',
            'FRAGGRENADE'
          ]
        },
        positions: [
          {
            x: 0,
            y: 1
          }
        ]
      },
      {
        name: 'PHYD',
        color: 'yellow',
        role: 'Lurker',
        loadout: {
          primary: 'SG553',
          secondary: 'GLOCK18',
          gear: [ 'HELMET', 'KEVLAR' ],
          utilities: [ 'FLASHGRENADE', 'FLASHGRENADE', 'FRAGGRENADE', 'MOLOTOV' ]
        },
        positions: [
          {
            x: 0,
            y: 1
          }
        ]
      }
    ]
  }
}
