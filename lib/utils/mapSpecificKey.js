"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapSpecificKey(arr, key, type) {
    function existFn(arg) {
        return arg !== undefined && arg && arg.length > 0;
    }
    var itemArr = existFn(arr)
        ? arr.map(function (item) { return item[key] || null; })
        : [];
    var validArr = itemArr.filter(function (item) {
        return type !== undefined ? typeof item === type : item;
    });
    var result = validArr.filter(function (item) { return item !== null; });
    return result;
}
exports.mapSpecificKey = mapSpecificKey;
