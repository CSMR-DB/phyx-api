"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapSpecificKey(arr, key, type) {
    function existFn(arg) {
        return arg !== undefined && arg && arg.length > 0;
    }
    const itemArr = existFn(arr)
        ? arr.map((item) => item[key] || null)
        : [];
    const validArr = itemArr.filter((item) => {
        return type !== undefined ? typeof item === type : item;
    });
    const result = validArr.filter((item) => item !== null);
    return result;
}
exports.mapSpecificKey = mapSpecificKey;
