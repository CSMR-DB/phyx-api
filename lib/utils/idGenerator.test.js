"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var idGenerator_1 = require("./idGenerator");
describe('idGenerator', function () {
    var someWordToId = 'Some-word18%~';
    test('should return a string with all non-word-characters removed', function () {
        expect(idGenerator_1.idGenerator(someWordToId)).toEqual('Someword18');
    });
    describe('idGenerator options object', function () {
        test('should return an object', function () {
            expect(idGenerator_1.idGenerator(someWordToId, { uppercase: true })).toEqual('SOMEWORD18');
        });
        test('should return an id with prefix', function () {
            expect(idGenerator_1.idGenerator(someWordToId, { prefix: 'kek' })).toEqual('kekSomeword18');
        });
    });
});
