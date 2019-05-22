"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToId = (incomingString) => {
    const outgoingString = incomingString.replace(/\W/g, '').toUpperCase();
    return outgoingString;
};
//# sourceMappingURL=string-convertor.js.map