"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectToArray_1 = require("./objectToArray");
var testCases = [
    {
        input: {
            player_1: {
                name: 'Zombie'
            },
            player_2: {
                name: 'Cookie'
            }
        },
        expected: [
            {
                name: 'Zombie'
            },
            {
                name: 'Cookie'
            }
        ]
    }
];
describe('objectToArray()', function () {
    test.each(testCases)('should turn team.players object into an array of players', function (_a) {
        var input = _a.input, expected = _a.expected;
        expect(objectToArray_1.objectToArray(input)).toEqual(expected);
    });
});
