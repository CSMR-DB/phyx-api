"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sumArray_1 = require("./sumArray");
describe('sumArray', function () {
    var CASES = [
        { input: [2, 2], expected: 4 },
        { input: [16, 4, 128, 64], expected: 212 }
    ];
    test.each(CASES)('[2, 2] should return 4', function (_a) {
        var input = _a.input, expected = _a.expected;
        expect(sumArray_1.sumArray(input)).toEqual(expected);
    });
});
