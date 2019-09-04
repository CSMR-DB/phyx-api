"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const idGenerator_1 = require("~src/utils/idGenerator");
var GENERIC;
(function (GENERIC) {
    function DATAFACTORY() {
        const LOCAL_INVENTORY = {
            EQUIPMENT: [],
            MAPS: []
        };
        function ADD_MAP(obj) {
            LOCAL_INVENTORY.MAPS.push(obj);
        }
        function ADD_EQUIPMENT(obj) {
            LOCAL_INVENTORY.EQUIPMENT.push(obj);
        }
        function getAllMaps() {
            // DataService.getMaps()
            return LOCAL_INVENTORY.MAPS;
        }
        function getAllEquipment() {
            // DataService.getEquipment()
            return LOCAL_INVENTORY.EQUIPMENT;
        }
        return Object.freeze({
            ADD_MAP,
            ADD_EQUIPMENT,
            getAllMaps,
            getAllEquipment
        });
    }
    GENERIC.DATAFACTORY = DATAFACTORY;
})(GENERIC || (GENERIC = {}));
var CSGO;
(function (CSGO) {
    CSGO.BLUEPRINTS = {
        MAP: (name) => ({
            name,
            id: idGenerator_1.idGenerator(name, { uppercase: true })
        }),
        EQUIPMENT: (name, cost, side) => ({
            name,
            id: idGenerator_1.idGenerator(name, { uppercase: true }),
            cost,
            side
        })
    };
})(CSGO = exports.CSGO || (exports.CSGO = {}));
// IS Singleton? Exporting a single instance without allowing the factory function to be exported generates a single instance to be used
exports.CSGOFACTORYFN = GENERIC.DATAFACTORY();
exports.CSGOFACTORYFN.ADD_MAP({ name: 'Inferno', id: 'INFERNO' });
exports.CSGOFACTORYFN.ADD_MAP(CSGO.BLUEPRINTS.MAP('Dust 2'));
exports.CSGOFACTORYFN.ADD_EQUIPMENT(CSGO.BLUEPRINTS.EQUIPMENT('Glock-18', 0, 'ATK'));
exports.CSGOFACTORYFN.ADD_EQUIPMENT({
    name: 'SSG-01',
    id: 'SSG01',
    cost: 1700,
    side: 'UNI'
});
// console.log(CSGOFACTORYFN.getAllMaps(), CSGOFACTORYFN.getAllEquipment())
