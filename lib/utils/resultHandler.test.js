"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resultHandler_1 = require("./resultHandler");
describe('ResultHandler', function () {
    var _a;
    var resultHandlerErrorBoolean = resultHandler_1.resultHandler((_a = {
            true: function () { return true; }
        },
        _a[Error.name] = function () {
            throw new Error('Error value for option that throws an error');
        },
        _a));
    var resultHandlerNumber = resultHandler_1.resultHandler({
        '1': function () { return true; },
        '2': function () {
            throw new Error('Error value for option that throws an error');
        }
    });
    test('Returns a value provided in the results scenarios', function () {
        expect(resultHandlerNumber.handle(1)).toEqual(true);
    });
    test('Can throw an error', function () {
        var TE = new Error('test');
        expect(function () { return resultHandlerErrorBoolean.handle(TE); }).toThrow();
    });
});
