"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csgoStrategyDataTransposer_1 = require("./csgoStrategyDataTransposer");
var csgoStrategyValid_mock_1 = require("~src/features/csgo/mocks/csgoStrategyValid.mock");
var csgoStrategyInvalidItems_mock_1 = require("./mocks/csgoStrategyInvalidItems.mock");
var csgoStrategyInvalidSlots_mock_1 = require("./mocks/csgoStrategyInvalidSlots.mock");
describe('CSGOStrategyDataTransposer()', function () {
    test('should reduce items to a unique set of IDs', function () {
        expect(csgoStrategyDataTransposer_1.csgoStrategyDataTransposer(csgoStrategyValid_mock_1.csgoStrategyValid).uniqueIDs).toContain('AWP');
    });
    test('should reduce items to a unique set of IDs', function () {
        expect(csgoStrategyDataTransposer_1.csgoStrategyDataTransposer(csgoStrategyInvalidItems_mock_1.csgoStrategyInvalidItems).uniqueIDs).toContain('GLOCKZZZZ18');
    });
    test('should create an object combining itemIDs with their slots as submitted', function () {
        expect(csgoStrategyDataTransposer_1.csgoStrategyDataTransposer(csgoStrategyInvalidSlots_mock_1.csgoStrategyInvalidSlots).slots).toEqual(expect.arrayContaining([{ slot: 'secondary', internal_id: 'AWP' }]));
    });
});
