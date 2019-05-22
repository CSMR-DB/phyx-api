"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mapSpecificKey_1 = tslib_1.__importDefault(require("./mapSpecificKey"));
var testArray = [
    {
        cost: 200,
        name: 'Flash',
        id: 'FLASHGRENADE',
        side: 'UNI'
    },
    {
        cost: 200,
        name: 'Flash',
        id: 'FLASHGRENADE',
        side: 'UNI'
    },
    {
        cost: 300,
        name: 'Frag',
        id: 'FRAGGRENADE',
        side: 'UNI'
    },
    {
        cost: 300,
        name: 'Smoke',
        id: 'SMOKEGRENADE',
        side: 'UNI'
    }
];
var testArrayWithMissingValue = [
    {
        cost: 200
    },
    {},
    {
        cost: 300
    },
    {
        cost: 300
    }
];
var testArrayWithIncorrectType = [
    {
        cost: 200
    },
    { cost: 'hey' },
    {
        cost: 300
    },
    {
        cost: 300
    }
];
var testCases = [
    { input: testArray, field: 'cost', emptyValue: 0, expected: [200, 200, 300, 300] },
    { input: testArrayWithMissingValue, field: 'cost', emptyValue: 0, expected: [200, 300, 300] }
    // { input: testArrayWithIncorrectType, field: 'cost', emptyValue: 0, expected: [ 200, 300, 300 ] }
];
describe('mapSpecificKey<number>', function () {
    test.each(testCases)('case', function (_a) {
        var input = _a.input, field = _a.field, expected = _a.expected;
        expect(mapSpecificKey_1.default(input, field)).toEqual(expected);
    });
});
