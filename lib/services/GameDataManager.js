"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataManager = /** ~class */ (function () {
    function DataManager(items) {
        this.items = items;
    }
    DataManager.prototype.hasID = function (id) {
        return this.items.some(function (item) { return item.id === id; });
    };
    DataManager.prototype.getOneById = function (id) {
        return this.hasID(id) ? this.items.find(function (item) { return item.id === id; }) : undefined;
    };
    DataManager.prototype.getField = function (id, field, undefinedReturn) {
        return this.hasID(id) ? this.getOneById(id)[field] : undefinedReturn;
    };
    return DataManager;
}());
exports.default = DataManager;
