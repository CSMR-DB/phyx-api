"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CSGOCostValidator_1 = tslib_1.__importDefault(require("./CSGOCostValidator"));
var resultHandler_1 = tslib_1.__importDefault(require("~src/utils/resultHandler"));
var csgo_strategy_valid_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-valid.mock"));
var csgo_strategy_invalidCost_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-invalidCost.mock"));
var csgo_strategy_onlyIDs_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-onlyIDs.mock"));
var dataFactory_1 = require("~src/features/csgo/data/dataFactory");
var GameDataManager_1 = tslib_1.__importDefault(require("~src/services/GameDataManager"));
describe('cost-validator-class', function () {
    var csgoDataManager = new GameDataManager_1.default(dataFactory_1.CSGOFACTORY.getItems());
    var resultHandlerDef = resultHandler_1.default({
        true: function () { return true; },
        false: function () {
            throw new Error("Strategy is not within budget");
        }
    });
    test('should be within budget and return true', function () {
        expect(new CSGOCostValidator_1.default(csgo_strategy_valid_mock_1.default, csgoDataManager, resultHandlerDef).execute()).toBe(true);
    });
    test('should be within budget and return true', function () {
        expect(new CSGOCostValidator_1.default(csgo_strategy_onlyIDs_mock_1.default, csgoDataManager, resultHandlerDef).execute()).toBe(true);
    });
    test('should be within budget and return true', function () {
        expect(new CSGOCostValidator_1.default(csgo_strategy_invalidCost_mock_1.default, csgoDataManager, resultHandlerDef).execute()).toBe(false);
    });
});
