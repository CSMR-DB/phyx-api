"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CSGOStrategyDataTransposer_1 = tslib_1.__importDefault(require("./CSGOStrategyDataTransposer"));
var GameDataManager_1 = tslib_1.__importDefault(require("~src/services/GameDataManager"));
var csgo_strategy_valid_mock_1 = tslib_1.__importDefault(require("~csgo/mocks/csgo-strategy-valid.mock"));
var dataFactory_1 = require("~src/features/csgo/data/dataFactory");
describe('CSGOStrategyDataTransposer()', function () {
    var csgoDataManager = new GameDataManager_1.default(dataFactory_1.CSGOFACTORY.getItems());
    test('should reduce items to a unique set of IDs', function () {
        expect(new CSGOStrategyDataTransposer_1.default(csgo_strategy_valid_mock_1.default, csgoDataManager).uniqueIDs).toContain('AWP');
    });
    test('should reduce items to a unique set of sides', function () {
        expect(new CSGOStrategyDataTransposer_1.default(csgo_strategy_valid_mock_1.default, csgoDataManager).uniqueSides).toEqual(['ATK']);
    });
});
