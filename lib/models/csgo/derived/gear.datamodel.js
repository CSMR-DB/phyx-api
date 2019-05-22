"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const equipment_datamodel_1 = tslib_1.__importDefault(require("../base/equipment.datamodel"));
class GearModel extends equipment_datamodel_1.default {
    constructor() {
        super(...arguments);
        this.slot = 'gear';
        this.category = 'gear';
    }
}
exports.GearModel = GearModel;
class GearModelUNI extends GearModel {
    constructor() {
        super(...arguments);
        this.side = 'UNI';
    }
}
exports.GearModelUNI = GearModelUNI;
class GearModelATK extends GearModel {
    constructor() {
        super(...arguments);
        this.side = 'ATK';
    }
}
exports.GearModelATK = GearModelATK;
class GearModelDEF extends GearModel {
    constructor() {
        super(...arguments);
        this.side = 'DEF';
    }
}
exports.GearModelDEF = GearModelDEF;
const KEVLAR = new GearModelUNI('Kevlar', 650);
const HELMET = new GearModelUNI('Helmet', 350);
const ZEUS = new GearModelUNI('Zeus', 2700);
const DEFUSER = new GearModelDEF('Defuse Kit', 2750);
exports.UGEAR = [KEVLAR, HELMET, ZEUS];
exports.TGEAR = [...exports.UGEAR];
exports.CTGEAR = [DEFUSER, ...exports.UGEAR];
exports.ALLGEAR = [...exports.UGEAR, ...exports.TGEAR, ...exports.CTGEAR];
//# sourceMappingURL=gear.datamodel.js.map