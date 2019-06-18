"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var idGenerator_1 = require("~src/utils/idGenerator");
var CSGO;
(function (CSGO) {
    function dataFactory(options) {
        // const LOCAL_INVENTORY: ILocalInventory = Object.freeze({
        //   ITEMS: [],
        //   MAPS: []
        // })
        var LOCAL_INVENTORY_MAP = Object.freeze({
            ITEMS: new Map(),
            MAPS: new Map()
        });
        function generateID(name) {
            return options.idGenerator(name, { uppercase: true });
        }
        function addMap(name, official) {
            var internal_id = generateID(name);
            var M = Object.freeze({ name: name, official: official, internal_id: internal_id });
            // LOCAL_INVENTORY.MAPS.push(M)
            LOCAL_INVENTORY_MAP.MAPS.set(internal_id, M);
        }
        function getMaps() {
            // return LOCAL_INVENTORY.MAPS
            return Array.from(LOCAL_INVENTORY_MAP.MAPS.values());
        }
        function getMapByID(id) {
            // return getMaps().find((map: IMap) => map.internal_id === id)
            return LOCAL_INVENTORY_MAP.MAPS.get(id);
        }
        function categorizer(slot, category) {
            var categoryObject = {
                primary: { categories: ['weapon', category] },
                secondary: { categories: ['weapon', 'pistol'] },
                gear: { categories: ['gear'] },
                utilities: { categories: ['utilities'] }
            };
            return categoryObject[slot];
        }
        function addItem(side, name, cost, slot, category) {
            var internal_id = generateID(name);
            var E = Object.freeze(tslib_1.__assign({ name: name,
                cost: cost,
                side: side,
                slot: slot,
                internal_id: internal_id }, categorizer(slot, category)));
            // LOCAL_INVENTORY.ITEMS.push(E)
            LOCAL_INVENTORY_MAP.ITEMS.set(internal_id, E);
        }
        function getItems() {
            // return LOCAL_INVENTORY.ITEMS
            return Array.from(LOCAL_INVENTORY_MAP.ITEMS.values());
        }
        function getItemByID(id) {
            // return getItems().find((item: IItem) => item.internal_id === id)
            return LOCAL_INVENTORY_MAP.ITEMS.get(id);
        }
        function getItemsBySide(side) {
            return getItems().filter(function (item) { return item.side === side; });
        }
        return Object.freeze({
            addMap: addMap,
            getMaps: getMaps,
            getMapByID: getMapByID,
            addItem: addItem,
            getItems: getItems,
            getItemByID: getItemByID,
            getItemsBySide: getItemsBySide
        });
    }
    CSGO.dataFactory = dataFactory;
})(CSGO = exports.CSGO || (exports.CSGO = {}));
var CSGOFACTORY = CSGO.dataFactory({
    idGenerator: idGenerator_1.idGenerator
});
exports.CSGOFACTORY = CSGOFACTORY;
CSGOFACTORY.addItem('UNI', 'Dual Berettas', 400, 'secondary');
CSGOFACTORY.addItem('UNI', 'P-250', 300, 'secondary');
CSGOFACTORY.addItem('UNI', 'Desert Eagle', 700, 'secondary');
CSGOFACTORY.addItem('UNI', 'R8 Revolver', 600, 'secondary');
CSGOFACTORY.addItem('UNI', 'CZ-75', 500, 'secondary');
CSGOFACTORY.addItem('ATK', 'Glock-18', 0, 'secondary');
CSGOFACTORY.addItem('ATK', 'Tec-9', 500, 'secondary');
CSGOFACTORY.addItem('DEF', 'USP-S', 0, 'secondary');
CSGOFACTORY.addItem('DEF', 'P-2000', 0, 'secondary');
CSGOFACTORY.addItem('DEF', 'Five-Seven', 500, 'secondary');
CSGOFACTORY.addItem('UNI', 'Nova', 1200, 'primary', 'heavy');
CSGOFACTORY.addItem('UNI', 'XM-1012', 1800, 'primary', 'heavy');
CSGOFACTORY.addItem('UNI', 'Negev', 1750, 'primary', 'heavy');
CSGOFACTORY.addItem('UNI', 'M249', 4150, 'primary', 'heavy');
CSGOFACTORY.addItem('ATK', 'Sawed-off', 1200, 'primary', 'heavy');
CSGOFACTORY.addItem('DEF', 'MAG-7', 1200, 'primary', 'heavy');
CSGOFACTORY.addItem('UNI', 'SSG 08', 1700, 'primary', 'rifle');
CSGOFACTORY.addItem('UNI', 'AWP', 4750, 'primary', 'rifle');
CSGOFACTORY.addItem('ATK', 'AK-47', 2700, 'primary', 'rifle');
CSGOFACTORY.addItem('ATK', 'Galil AR', 2000, 'primary', 'rifle');
CSGOFACTORY.addItem('ATK', 'SG 553', 2750, 'primary', 'rifle');
CSGOFACTORY.addItem('ATK', 'G3SG1', 5150, 'primary', 'rifle');
CSGOFACTORY.addItem('DEF', 'M4A4', 3100, 'primary', 'rifle');
CSGOFACTORY.addItem('DEF', 'M4A1-S', 3100, 'primary', 'rifle');
CSGOFACTORY.addItem('DEF', 'Famas', 2250, 'primary', 'rifle');
CSGOFACTORY.addItem('DEF', 'AUG', 3150, 'primary', 'rifle');
CSGOFACTORY.addItem('DEF', 'SCAR-20', 5150, 'primary', 'rifle');
CSGOFACTORY.addItem('UNI', 'MP7', 1700, 'primary', 'smg');
CSGOFACTORY.addItem('UNI', 'UMP5-SD', 1500, 'primary', 'smg');
CSGOFACTORY.addItem('UNI', 'UMP-45', 1200, 'primary', 'smg');
CSGOFACTORY.addItem('UNI', 'PP-Bizon', 1200, 'primary', 'smg');
CSGOFACTORY.addItem('UNI', 'P-90', 2350, 'primary', 'smg');
CSGOFACTORY.addItem('ATK', 'Mac-10', 1050, 'primary', 'smg');
CSGOFACTORY.addItem('DEF', 'MP9', 1250, 'primary', 'smg');
CSGOFACTORY.addItem('UNI', 'Kevlar', 650, 'gear');
CSGOFACTORY.addItem('UNI', 'Helmet', 350, 'gear');
CSGOFACTORY.addItem('UNI', 'Zeus', 200, 'gear');
CSGOFACTORY.addItem('DEF', 'Defuse Kit', 400, 'gear');
CSGOFACTORY.addItem('UNI', 'Smoke Grenade', 300, 'utilities');
CSGOFACTORY.addItem('UNI', 'Flash Grenade', 200, 'utilities');
CSGOFACTORY.addItem('UNI', 'Frag Grenade', 300, 'utilities');
CSGOFACTORY.addItem('UNI', 'Decoy Grenade', 50, 'utilities');
CSGOFACTORY.addItem('ATK', 'Molotov', 400, 'utilities');
CSGOFACTORY.addItem('DEF', 'Incendiary Grenade', 600, 'utilities');
CSGOFACTORY.addMap('Mirage', true);
CSGOFACTORY.addMap('Inferno', true);
CSGOFACTORY.addMap('Nuke', true);
CSGOFACTORY.addMap('Cache', true);
CSGOFACTORY.addMap('Overpass', true);
CSGOFACTORY.addMap('Cobblestone', false);
CSGOFACTORY.addMap('Dust 2', true);
