"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gameDataManager(items) {
    var itemsMap = new Map();
    items.map(function (item) { return itemsMap.set(item.internal_id, item); });
    function hasID(id) {
        var result = itemsMap.has(id);
        return result;
    }
    function getOneById(id) {
        var result = itemsMap.get(id);
        return result;
    }
    function getField(id, field, undefinedReturn) {
        var result = itemsMap.has(id)
            ? itemsMap.get(id)[field]
            : undefinedReturn;
        return result;
    }
    return Object.freeze({ hasID: hasID, getOneById: getOneById, getField: getField });
}
exports.gameDataManager = gameDataManager;
