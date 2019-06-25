"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gameDataManager(items) {
    var itemsMap = new Map();
    items.map(function (item) { return itemsMap.set(item.internal_id, item); });
    function hasID(id) {
        return itemsMap.has(id);
    }
    function getOneById(id) {
        return itemsMap.get(id);
    }
    function getField(id, field, undefinedReturn) {
        return itemsMap.has(id) ? itemsMap.get(id)[field] : undefinedReturn;
    }
    return Object.freeze({ hasID: hasID, getOneById: getOneById, getField: getField });
}
exports.gameDataManager = gameDataManager;
