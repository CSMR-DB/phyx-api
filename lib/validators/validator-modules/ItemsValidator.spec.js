"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ItemsValidator_1 = tslib_1.__importStar(require("./ItemsValidator"));
var csgo_strategy_valid_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-valid.mock"));
var csgo_strategy_invalidItems_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-invalidItems.mock"));
var CSGOStrategyDataTransposer_1 = tslib_1.__importDefault(require("~src/features/csgo/CSGOStrategyDataTransposer"));
var dataFactory_1 = require("~src/features/csgo/data/dataFactory");
var GameDataManager_1 = tslib_1.__importDefault(require("~src/services/GameDataManager"));
describe('ItemsValidator', function () {
    var csgoDataManager = new GameDataManager_1.default(dataFactory_1.CSGOFACTORY.getItems());
    test('validates reduced items, valid', function () {
        var itemsValidator = new ItemsValidator_1.default(csgo_strategy_valid_mock_1.default, csgoDataManager, new CSGOStrategyDataTransposer_1.default(csgo_strategy_valid_mock_1.default, csgoDataManager));
        expect(itemsValidator.execute()).toEqual(true);
    });
    test('validates reduced items, invalid', function () {
        var itemsValidator = new ItemsValidator_1.default(csgo_strategy_invalidItems_mock_1.default, csgoDataManager, new CSGOStrategyDataTransposer_1.default(csgo_strategy_invalidItems_mock_1.default, csgoDataManager));
        expect(itemsValidator.execute()).toEqual(false);
    });
    test('validates reduced items, valid', function () {
        expect(ItemsValidator_1.itemsValidator(csgo_strategy_valid_mock_1.default, csgoDataManager, new CSGOStrategyDataTransposer_1.default(csgo_strategy_valid_mock_1.default, csgoDataManager)).execute()).toEqual(true);
    });
});
