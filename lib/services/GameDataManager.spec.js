"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("./gameDataManager");
var r6siege_operators_1 = require("~src/features/r6siege/data/r6siege-operators");
var dataFactory_1 = require("~src/features/csgo/data/dataFactory");
describe('DataManager()', function () {
    var ALLITEMS = dataFactory_1.CSGOFACTORY.getItems();
    var testCases = [
        {
            dataToFind: { id: 'GLOCK18', name: 'Glock 18' },
            dataArray: ALLITEMS,
            data: {
                name: 'Glock-18',
                cost: 0,
                side: 'ATK',
                slot: 'secondary',
                internal_id: 'GLOCK18',
                categories: ['weapon', 'pistol']
            },
            has: true
        },
        {
            dataToFind: { id: 'AK47' },
            dataArray: ALLITEMS,
            data: {
                name: 'AK-47',
                cost: 2700,
                side: 'ATK',
                slot: 'primary',
                internal_id: 'AK47',
                categories: ['weapon', 'rifle']
            },
            has: true
        },
        {
            dataToFind: { id: 'AK99' },
            dataArray: ALLITEMS,
            data: undefined,
            has: false
        },
        {
            dataToFind: { id: 'P-2001' },
            dataArray: ALLITEMS,
            data: undefined,
            has: false
        },
        {
            dataToFind: { id: 'FRAGGRENADE' },
            dataArray: ALLITEMS,
            data: {
                name: 'Frag Grenade',
                cost: 300,
                side: 'UNI',
                slot: 'utility',
                internal_id: 'FRAGGRENADE',
                categories: ['utility']
            },
            has: true
        },
        {
            dataToFind: { id: 'ASH' },
            dataArray: r6siege_operators_1.ALLOPERATORS,
            data: r6siege_operators_1.Attackers.ASH,
            has: true
        },
        {
            dataToFind: { id: 'USH' },
            dataArray: r6siege_operators_1.ALLOPERATORS,
            data: undefined,
            has: false
        }
    ];
    test.each(testCases)("getOneById() should return full item, or undefined", function (_a) {
        var id = _a.dataToFind.id, dataArray = _a.dataArray, data = _a.data;
        var itemsManager = gameDataManager_1.gameDataManager(dataArray);
        expect(itemsManager.getOneById(id)).toEqual(data);
    });
    test.each(testCases)("has() should return boolean if id exists", function (_a) {
        var id = _a.dataToFind.id, dataArray = _a.dataArray, has = _a.has;
        var itemsManager = gameDataManager_1.gameDataManager(dataArray);
        expect(itemsManager.hasID(id)).toEqual(has);
    });
});
