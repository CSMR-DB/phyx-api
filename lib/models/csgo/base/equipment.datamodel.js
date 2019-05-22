"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_convertor_1 = require("./../../../utils/string-convertor");
class EquipmentModel {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
        this.id = string_convertor_1.stringToId(name);
    }
}
exports.default = EquipmentModel;
//# sourceMappingURL=equipment.datamodel.js.map