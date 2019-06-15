"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csgoStrategyDataTransposer_1 = require("./csgoStrategyDataTransposer");
var csgoStrategyValid_mock_1 = require("~src/features/csgo/mocks/csgoStrategyValid.mock");
var csgoStrategyInvalidItems_mock_1 = require("./mocks/csgoStrategyInvalidItems.mock");
describe('CSGOStrategyDataTransposer()', function () {
    test('should reduce items to a unique set of IDs', function () {
        expect(csgoStrategyDataTransposer_1.csgoStrategyDataTransposer(csgoStrategyValid_mock_1.csgoStrategyValid).uniqueIDs).toContain('AWP');
    });
    test('should reduce items to a unique set of IDs', function () {
        expect(csgoStrategyDataTransposer_1.csgoStrategyDataTransposer(csgoStrategyInvalidItems_mock_1.csgoStrategyInvalidItems).uniqueIDs).toContain('AUG');
    });
});
