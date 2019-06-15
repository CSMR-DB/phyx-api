"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sumArray(arr) {
    return arr.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    }, 0);
}
exports.sumArray = sumArray;
