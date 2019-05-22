"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csgoStrategy = {
    map: 'Nuke',
    name: 'Default A',
    description: 'Execute with smokes to CT, Stairs and Jungle',
    side: 'ATK',
    budget: 5000,
    team: {
        name: 'NUBBS',
        players: {
            player_1: {
                id: '913569182756871u24fgkivuhj12b4',
                name: 'Zombie',
                role: 'Sniper',
                color: 'blue',
                loadout: {
                    primary: {
                        cost: 4750,
                        name: 'AWP',
                        side: 'ATK'
                    },
                    secondary: {
                        cost: 0,
                        name: 'Glock',
                        side: 'ATK'
                    },
                    gear: [],
                    utilities: [
                        {
                            cost: 200,
                            name: 'Flash',
                            side: 'UNI'
                        },
                        {
                            cost: 50,
                            name: 'Decoy',
                            side: 'UNI'
                        }
                    ]
                },
                positions: [
                    {
                        x: 0,
                        y: 1
                    }
                ]
            },
            player_2: {
                id: '124690876hbghigk1uy2fvkut4fgv1vk',
                name: 'Cookie',
                color: 'purple',
                role: 'Entry',
                loadout: {
                    primary: {
                        cost: 2700,
                        name: 'AK-47',
                        side: 'ATK'
                    },
                    secondary: {
                        cost: 0,
                        name: 'Glock',
                        side: 'ATK'
                    },
                    gear: [
                        {
                            cost: 350,
                            name: 'Helmet',
                            side: 'UNI'
                        },
                        {
                            cost: 650,
                            name: 'Kevlar',
                            side: 'UNI'
                        }
                    ],
                    utilities: [
                        {
                            cost: 200,
                            name: 'Flash',
                            side: 'UNI'
                        },
                        {
                            cost: 200,
                            name: 'Flash',
                            side: 'UNI'
                        },
                        {
                            cost: 300,
                            name: 'Frag',
                            side: 'UNI'
                        },
                        {
                            cost: 300,
                            name: 'Smoke',
                            side: 'UNI'
                        }
                    ]
                },
                positions: [
                    {
                        x: 0,
                        y: 1
                    }
                ]
            },
            player_3: {
                id: '124690876hbghigk1uy2fvkut4fgv1vk',
                name: 'Night',
                color: 'green',
                role: 'Entry',
                loadout: {
                    primary: {
                        cost: 2700,
                        name: 'AK-47',
                        side: 'ATK'
                    },
                    secondary: {
                        cost: 0,
                        name: 'Glock',
                        side: 'ATK'
                    },
                    gear: [
                        {
                            cost: 350,
                            name: 'Helmet',
                            side: 'UNI'
                        },
                        {
                            cost: 650,
                            name: 'Frag',
                            side: 'UNI'
                        }
                    ],
                    utilities: [
                        {
                            cost: 200,
                            name: 'Flash',
                            side: 'UNI'
                        },
                        {
                            cost: 200,
                            name: 'Flash',
                            side: 'UNI'
                        },
                        {
                            cost: 300,
                            name: 'Frag',
                            side: 'UNI'
                        },
                        {
                            cost: 300,
                            name: 'Smoke',
                            side: 'UNI'
                        }
                    ]
                },
                positions: [
                    {
                        x: 0,
                        y: 1
                    }
                ]
            },
            player_4: {
                id: '124690876hbghigk1uy2fvkut4fgv1vk',
                name: 'Alun',
                color: 'orange',
                role: 'Undefineable',
                loadout: {
                    primary: {
                        cost: 2350,
                        name: 'P-90',
                        side: 'UNI'
                    },
                    secondary: {
                        cost: 0,
                        name: 'Glock',
                        side: 'ATK'
                    },
                    gear: [
                        {
                            cost: 350,
                            name: 'Helmet',
                            side: 'UNI'
                        },
                        {
                            cost: 650,
                            name: 'Kevlar',
                            side: 'UNI'
                        }
                    ],
                    utilities: [
                        {
                            cost: 200,
                            name: 'Flash',
                            side: 'UNI'
                        },
                        {
                            cost: 200,
                            name: 'Flash',
                            side: 'UNI'
                        },
                        {
                            cost: 50,
                            name: 'Decoy',
                            side: 'UNI'
                        },
                        {
                            cost: 300,
                            name: 'Frag',
                            side: 'UNI'
                        }
                    ]
                },
                positions: [
                    {
                        x: 0,
                        y: 1
                    }
                ]
            },
            player_5: {
                id: '124690876hbghigk1uy2fvkut4fgv1vk',
                name: 'PHYD',
                color: 'yellow',
                role: 'Lurker',
                loadout: {
                    primary: {
                        cost: 2750,
                        name: 'SG-551',
                        side: 'ATK'
                    },
                    secondary: {
                        cost: 0,
                        name: 'Glock',
                        side: 'ATK'
                    },
                    gear: [
                        {
                            cost: 350,
                            name: 'Helmet',
                            side: 'UNI'
                        },
                        {
                            cost: 650,
                            name: 'Kevlar',
                            side: 'UNI'
                        }
                    ],
                    utilities: [
                        {
                            cost: 200,
                            name: 'Flash',
                            side: 'UNI'
                        },
                        {
                            cost: 200,
                            name: 'Flash',
                            side: 'UNI'
                        },
                        {
                            cost: 300,
                            name: 'Frag',
                            side: 'UNI'
                        },
                        {
                            cost: 300,
                            name: 'Molotov',
                            side: 'ATK'
                        }
                    ]
                },
                positions: [
                    {
                        x: 0,
                        y: 1
                    }
                ]
            }
        }
    }
};
exports.default = csgoStrategy;
//# sourceMappingURL=csgo-strategy.mock.js.map