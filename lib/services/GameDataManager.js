"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gameDataManager(items) {
    function hasID(id) {
        var result = items.some(function (item) { return item.internal_id === id; });
        return result;
    }
    function getOneById(id) {
        var result = hasID(id)
            ? items.find(function (item) { return item.internal_id === id; })
            : undefined;
        return result;
    }
    function getField(id, field, undefinedReturn) {
        var result = hasID(id) ? getOneById(id)[field] : undefinedReturn;
        return result;
    }
    return Object.freeze({ hasID: hasID, getOneById: getOneById, getField: getField });
}
exports.gameDataManager = gameDataManager;
