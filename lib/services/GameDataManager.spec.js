"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GameDataManager_1 = tslib_1.__importDefault(require("./GameDataManager"));
var siege_operators_1 = require("~src/features/siege/data/siege-operators");
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
                id: 'GLOCK18',
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
                id: 'AK47',
                categories: ['weapon', 'rifle']
            },
            has: true
        },
        { dataToFind: { id: 'AK99' }, dataArray: ALLITEMS, data: undefined, has: false },
        { dataToFind: { name: 'P-2001' }, dataArray: ALLITEMS, data: undefined, has: false },
        {
            dataToFind: { id: 'FRAGGRENADE' },
            dataArray: ALLITEMS,
            data: {
                name: 'Frag Grenade',
                cost: 300,
                side: 'UNI',
                slot: 'utility',
                id: 'FRAGGRENADE',
                categories: ['utility']
            },
            has: true
        },
        { dataToFind: { id: 'ASH' }, dataArray: siege_operators_1.ALLOPERATORS, data: siege_operators_1.Attackers.ASH, has: true },
        { dataToFind: { id: 'USH' }, dataArray: siege_operators_1.ALLOPERATORS, data: undefined, has: false }
    ];
    test.each(testCases)("getOneById() should return full item, or undefined", function (_a) {
        var dataToFind = _a.dataToFind, dataArray = _a.dataArray, data = _a.data;
        var itemsManager = new GameDataManager_1.default(dataArray);
        expect(itemsManager.getOneById(dataToFind.id)).toEqual(data);
    });
    test.each(testCases)("has() should return boolean if id exists", function (_a) {
        var dataToFind = _a.dataToFind, dataArray = _a.dataArray, has = _a.has;
        var itemsManager = new GameDataManager_1.default(dataArray);
        expect(itemsManager.hasID(dataToFind.id)).toEqual(has);
    });
});
