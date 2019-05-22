"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SideValidator_1 = tslib_1.__importStar(require("./SideValidator"));
var CSGOStrategyDataTransposer_1 = tslib_1.__importDefault(require("~src/features/csgo/CSGOStrategyDataTransposer"));
var dataFactory_1 = require("~src/features/csgo/data/dataFactory");
var csgo_strategy_valid_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-valid.mock"));
var csgo_strategy_invalidSide_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-invalidSide.mock"));
var GameDataManager_1 = tslib_1.__importDefault(require("~src/services/GameDataManager"));
describe('SideValidator()', function () {
    var csgoDataManager = new GameDataManager_1.default(dataFactory_1.CSGOFACTORY.getItems());
    test('SideValidator() with imported mock data [valid]', function () {
        expect(new SideValidator_1.default(csgo_strategy_valid_mock_1.default, new CSGOStrategyDataTransposer_1.default(csgo_strategy_valid_mock_1.default, csgoDataManager)).execute()).toEqual(true);
    });
    test('SideValidator() with imported mock data [invalid]', function () {
        expect(new SideValidator_1.default(csgo_strategy_invalidSide_mock_1.default, new CSGOStrategyDataTransposer_1.default(csgo_strategy_invalidSide_mock_1.default, csgoDataManager)).execute()).toEqual(false);
    });
    test('sideValidator() with imported mock data [valid]', function () {
        expect(SideValidator_1.sideValidator(csgo_strategy_valid_mock_1.default, new CSGOStrategyDataTransposer_1.default(csgo_strategy_valid_mock_1.default, csgoDataManager)).execute()).toEqual(true);
    });
});
