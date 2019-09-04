"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idGenerator = (input, options) => {
    let id = input.replace(/\W/g, '');
    if (options && options.uppercase) {
        id = id.toUpperCase();
    }
    if (options && options.prefix) {
        id = options.prefix + id;
    }
    return id;
};
