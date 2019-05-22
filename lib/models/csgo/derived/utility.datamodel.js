"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const equipment_datamodel_1 = tslib_1.__importDefault(require("../base/equipment.datamodel"));
class UtilityModel extends equipment_datamodel_1.default {
    constructor() {
        super(...arguments);
        this.slot = 'utility';
        this.category = 'utility';
    }
}
exports.UtilityModel = UtilityModel;
class UtilityModelUNI extends UtilityModel {
    constructor() {
        super(...arguments);
        this.side = 'UNI';
    }
}
exports.UtilityModelUNI = UtilityModelUNI;
class UtilityModelATK extends UtilityModel {
    constructor() {
        super(...arguments);
        this.side = 'ATK';
    }
}
exports.UtilityModelATK = UtilityModelATK;
class UtilityModelDEF extends UtilityModel {
    constructor() {
        super(...arguments);
        this.side = 'DEF';
    }
}
exports.UtilityModelDEF = UtilityModelDEF;
const SMOKE = new UtilityModelUNI('Smoke Grenade', 300);
const FLASH = new UtilityModelUNI('Flash Grenade', 200);
const FRAG = new UtilityModelUNI('Frag Grenade', 300);
const DECOY = new UtilityModelUNI('Decoy Grenade', 300);
const MOLOTOV = new UtilityModelATK('Molotov', 400);
const INCENDIARY = new UtilityModelDEF('Incendiary Grenade', 600);
exports.UUTILITY = [SMOKE, FLASH, FRAG, DECOY];
exports.TUTILITY = [MOLOTOV, ...exports.UUTILITY];
exports.CTUTILITY = [INCENDIARY, ...exports.UUTILITY];
exports.ALLUTILITY = [...exports.UUTILITY, ...exports.TUTILITY, ...exports.CTUTILITY];
//# sourceMappingURL=utility.datamodel.js.map