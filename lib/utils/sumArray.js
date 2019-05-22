"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sumArray = function (arr) {
    return arr.reduce(function (pV, cV) { return pV + cV; }, 0);
};
exports.default = sumArray;
