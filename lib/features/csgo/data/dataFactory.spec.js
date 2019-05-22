"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataFactory_1 = require("./dataFactory");
var idGenerator_1 = require("~src/utils/idGenerator");
describe('CSGOFACTORY', function () {
    var CSGOFACTORY = dataFactory_1.CSGO.dataFactory({ idGenerator: idGenerator_1.idGenerator });
    beforeAll(function () {
        CSGOFACTORY.addMap('Mirage', true);
        CSGOFACTORY.addItem('ATK', 'Glock-18', 0, 'secondary');
    });
    test('should correctly add a new item', function () {
        CSGOFACTORY.addItem('ATK', 'Bubblegum AWP', 420, 'primary', 'rifle');
        expect(CSGOFACTORY.getItemByID('BUBBLEGUMAWP')).toEqual({
            categories: ['weapon', 'rifle'],
            cost: 420,
            internal_id: 'BUBBLEGUMAWP',
            name: 'Bubblegum AWP',
            side: 'ATK',
            slot: 'primary'
        });
    });
    test('should include Mirage as a map', function () {
        expect(CSGOFACTORY.getMapByID('MIRAGE')).toEqual({ map_id: 'MIRAGE', name: 'Mirage', official: true });
    });
    test('should not include Consulate as a map', function () {
        expect(CSGOFACTORY.getMapByID('CONSULATE')).toEqual(undefined);
    });
    test('should include Glock-18 as an item', function () {
        expect(CSGOFACTORY.getItemByID('GLOCK18')).toEqual({
            categories: ['weapon', 'pistol'],
            cost: 0,
            internal_id: 'GLOCK18',
            name: 'Glock-18',
            side: 'ATK',
            slot: 'secondary'
        });
    });
    test('should not include a Peacekeeper as an item', function () {
        expect(CSGOFACTORY.getItemByID('PEACEKEEPER')).toEqual(undefined);
    });
});
