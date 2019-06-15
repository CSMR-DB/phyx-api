"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var csgoCostValidator_1 = require("./csgoCostValidator");
var resultHandler_1 = require("~src/utils/resultHandler");
var csgoStrategyValid_mock_1 = require("~src/features/csgo/mocks/csgoStrategyValid.mock");
var csgoStrategyInvalidCost_mock_1 = require("~src/features/csgo/mocks/csgoStrategyInvalidCost.mock");
var dataFactory_1 = require("~src/features/csgo/data/dataFactory");
var gameDataManager_1 = require("~src/services/gameDataManager");
describe('cost-validator-class', function () {
    var csgoDataManager = gameDataManager_1.gameDataManager(dataFactory_1.CSGOFACTORY.getItems());
    var resultHandlerDef = resultHandler_1.resultHandler({
        true: function () { return true; },
        false: function () {
            throw new Error("Strategy is not within budget");
        }
    });
    test('should be within budget and return true', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(csgoCostValidator_1.csgoCostValidator(csgoStrategyValid_mock_1.csgoStrategyValid, csgoDataManager).execute()).resolves.toEqual({ errors: [], result: true })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('should be within budget and return true', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(csgoCostValidator_1.csgoCostValidator(csgoStrategyInvalidCost_mock_1.csgoStrategyInvalidCost, csgoDataManager).execute()).resolves.toEqual({
                        errors: [Error('Cookie has spent too much on their loadout')],
                        result: false
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
