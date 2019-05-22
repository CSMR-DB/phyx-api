"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StrategyValidator_1 = tslib_1.__importStar(require("./StrategyValidator"));
var SideValidator_1 = tslib_1.__importStar(require("./validator-modules/SideValidator"));
var ItemsValidator_1 = tslib_1.__importStar(require("./validator-modules/ItemsValidator"));
var CSGOCostValidator_1 = tslib_1.__importDefault(require("~src/features/csgo/validation/CSGOCostValidator"));
var CSGOStrategyDataTransposer_1 = tslib_1.__importDefault(require("~src/features/csgo/CSGOStrategyDataTransposer"));
var csgo_strategy_valid_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-valid.mock"));
var csgo_strategy_invalidCost_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-invalidCost.mock"));
var csgo_strategy_invalidSide_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-invalidSide.mock"));
var csgo_strategy_invalidItems_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-invalidItems.mock"));
var csgo_strategy_onlyIDs_mock_1 = tslib_1.__importDefault(require("~src/features/csgo/mocks/csgo-strategy-onlyIDs.mock"));
var GameDataManager_1 = tslib_1.__importDefault(require("~src/services/GameDataManager"));
var siege_operators_1 = require("~src/features/siege/data/siege-operators");
var SiegeStrategyDataTransposer_1 = tslib_1.__importDefault(require("~src/features/siege/SiegeStrategyDataTransposer"));
var dataFactory_1 = require("~src/features/csgo/data/dataFactory");
describe('stratValidator()', function () {
    var csgoDataManager = new GameDataManager_1.default(dataFactory_1.CSGOFACTORY.getItems());
    var csgoDataReducer = function (strategy) { return new CSGOStrategyDataTransposer_1.default(strategy, csgoDataManager); };
    var siegeDataManager = new GameDataManager_1.default(siege_operators_1.ALLOPERATORS);
    var siegeDataReducer = function (strategy) { return new SiegeStrategyDataTransposer_1.default(strategy); };
    var testCases = [
        {
            strategy: csgo_strategy_valid_mock_1.default,
            dataManager: csgoDataManager,
            dataReducer: csgoDataReducer,
            expected: true
        },
        {
            strategy: csgo_strategy_invalidCost_mock_1.default,
            dataManager: csgoDataManager,
            dataReducer: csgoDataReducer,
            expected: false
        },
        {
            strategy: csgo_strategy_invalidSide_mock_1.default,
            dataManager: csgoDataManager,
            dataReducer: csgoDataReducer,
            expected: false
        },
        {
            strategy: csgo_strategy_invalidItems_mock_1.default,
            dataManager: csgoDataManager,
            dataReducer: csgoDataReducer,
            expected: false
        },
        {
            strategy: csgo_strategy_onlyIDs_mock_1.default,
            dataManager: csgoDataManager,
            dataReducer: csgoDataReducer,
            expected: true
        }
        // {
        //   strategy: siegeStrategy,
        //   dataManager: siegeDataManager,
        //   dataReducer: siegeDataReducer,
        //   expected: true
        // }
    ];
    test.each(testCases)('new StrategyValidator() case', function (_a) {
        var strategy = _a.strategy, dataManager = _a.dataManager, dataReducer = _a.dataReducer, expected = _a.expected;
        expect(new StrategyValidator_1.default(strategy, [
            new ItemsValidator_1.default(strategy, dataManager, dataReducer(strategy)),
            new CSGOCostValidator_1.default(strategy, dataManager),
            new SideValidator_1.default(strategy, dataReducer(strategy))
        ]).execute()).toEqual(expected);
    });
    test.each(testCases)('strategyValidator() case', function (_a) {
        var strategy = _a.strategy, dataManager = _a.dataManager, dataReducer = _a.dataReducer, expected = _a.expected;
        expect(StrategyValidator_1.strategyValidator([
            ItemsValidator_1.itemsValidator(strategy, dataManager, dataReducer(strategy)),
            new CSGOCostValidator_1.default(strategy, dataManager),
            SideValidator_1.sideValidator(strategy, dataReducer(strategy))
        ]).execute()).toEqual(expected);
    });
});
