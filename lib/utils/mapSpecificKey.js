"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapSpecificKey = function (arr, key) {
    var existFn = function (arg) { return arg !== undefined && arg && arg.length > 0; };
    var itemArr = existFn(arr) ? arr.map(function (item) { return item[key] || null; }) : [];
    return itemArr.filter(function (item) { return item !== null; });
};
exports.default = mapSpecificKey;
