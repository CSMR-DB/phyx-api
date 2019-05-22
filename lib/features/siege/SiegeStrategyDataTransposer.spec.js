"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SiegeStrategyDataTransposer_1 = tslib_1.__importDefault(require("./SiegeStrategyDataTransposer"));
var siege_strategy_mock_1 = tslib_1.__importDefault(require("~src/features/siege/mocks/siege-strategy.mock"));
describe.skip('StrategyItemsReducer', function () {
    test('should return an array of Operator IDs', function () {
        expect(new SiegeStrategyDataTransposer_1.default(siege_strategy_mock_1.default).operatorIDs).toEqual(['ASH', 'MONTAGNE', 'TWITCH', 'FUZE', 'BUCK']);
    });
    test('should return an array (from Set) of Operator IDs', function () {
        expect(new SiegeStrategyDataTransposer_1.default(siege_strategy_mock_1.default).uniqueOperatorIDs).toEqual([
            'ASH',
            'MONTAGNE',
            'TWITCH',
            'FUZE',
            'BUCK'
        ]);
    });
});
