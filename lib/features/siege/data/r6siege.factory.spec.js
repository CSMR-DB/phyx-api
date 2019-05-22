"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var r6siege_factory_1 = require("./r6siege.factory");
var idGenerator_1 = require("~src/utils/idGenerator");
describe('R6SIEGEFACTORY', function () {
    var R6SIEGEFACTORY = r6siege_factory_1.R6SIEGE.DATAFACTORY({ idGenerator: idGenerator_1.idGenerator });
    beforeAll(function () {
        R6SIEGEFACTORY.addItem('G36-C', 'primary', 'AR');
        R6SIEGEFACTORY.addMap('Consulate', true);
        R6SIEGEFACTORY.addOperator('ATK', 'Sledge', 'SAS', ['L85A2'], ['P226MK25'], ['FRAGGRENADE'], ['The Caber', false, 25]);
    });
    test('should correctly add a new item', function () {
        R6SIEGEFACTORY.addItem('L85A2', 'primary', 'AR');
        expect(R6SIEGEFACTORY.getItemByID('L85A2')).toEqual({
            categories: ['weapon', 'AR'],
            id: 'L85A2',
            name: 'L85A2',
            slot: 'primary'
        });
    });
    test('should include Consulate as a map', function () {
        expect(R6SIEGEFACTORY.getMapByID('CONSULATE')).toEqual({ id: 'CONSULATE', name: 'Consulate', official: true });
    });
    test('should not include Mirage as a map', function () {
        expect(R6SIEGEFACTORY.getMapByID('MIRAGE')).toEqual(undefined);
    });
    test('should include G36C as an item', function () {
        expect(R6SIEGEFACTORY.getItemByID('G36C')).toEqual({
            categories: ['weapon', 'AR'],
            id: 'G36C',
            name: 'G36-C',
            slot: 'primary'
        });
    });
    test('should not include a Peacekeeper as an item', function () {
        expect(R6SIEGEFACTORY.getItemByID('PEACEKEEPER')).toEqual(undefined);
    });
    test('should correctly add a new Operator', function () {
        R6SIEGEFACTORY.addOperator('ATK', 'Ash', 'SWAT', ['G36C'], ['57USG'], ['STUNGRENADE'], ['M120 CREM', true, 2]);
        expect(R6SIEGEFACTORY.getOperatorByID('ASH')).toEqual({
            side: 'ATK',
            name: 'Ash',
            id: 'ASH',
            organization: 'SWAT',
            primaries: ['G36C'],
            secondaries: ['57USG'],
            utilities: ['STUNGRENADE'],
            gadget: { name: 'M120 CREM', id: 'M120CREM', deployable: true, count: 2 }
        });
    });
    test('should include Sledge as an Operator', function () {
        expect(R6SIEGEFACTORY.getOperatorByID('SLEDGE')).toEqual({
            side: 'ATK',
            name: 'Sledge',
            id: 'SLEDGE',
            organization: 'SAS',
            primaries: ['L85A2'],
            secondaries: ['P226MK25'],
            utilities: ['FRAGGRENADE'],
            gadget: { name: 'The Caber', id: 'THECABER', deployable: false, count: 25 }
        });
    });
    test('should not include Caustic as an operator', function () {
        expect(R6SIEGEFACTORY.getOperatorByID('CAUSTIC')).toEqual(undefined);
    });
});
