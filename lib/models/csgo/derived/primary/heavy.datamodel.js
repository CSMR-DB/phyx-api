"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const weapon_datamodel_1 = tslib_1.__importDefault(require("../../base/weapon.datamodel"));
class HeavyModel extends weapon_datamodel_1.default {
    constructor() {
        super(...arguments);
        this.slot = 'primary';
        this.category = 'heavy';
    }
}
exports.HeavyModel = HeavyModel;
class HeavyModelUNI extends HeavyModel {
    constructor() {
        super(...arguments);
        this.side = 'UNI';
    }
}
exports.HeavyModelUNI = HeavyModelUNI;
class HeavyModelATK extends HeavyModel {
    constructor() {
        super(...arguments);
        this.side = 'ATK';
    }
}
exports.HeavyModelATK = HeavyModelATK;
class HeavyModelDEF extends HeavyModel {
    constructor() {
        super(...arguments);
        this.side = 'DEF';
    }
}
exports.HeavyModelDEF = HeavyModelDEF;
const NOVA = new HeavyModelUNI('Nova', 1200);
const XM1012 = new HeavyModelUNI('XM-1012', 1800);
const NEGEV = new HeavyModelUNI('Negev', 1750);
const M249 = new HeavyModelUNI('M249', 4150);
const SAWEDOFF = new HeavyModelATK('Sawed-off', 1200);
const MAG7 = new HeavyModelDEF('MAG-7', 1200);
exports.UHEAVYS = [NOVA, XM1012, NEGEV, M249];
exports.THEAVYS = [SAWEDOFF, ...exports.UHEAVYS];
exports.CTHEAVYS = [MAG7, ...exports.UHEAVYS];
exports.ALLHEAVYS = [...exports.UHEAVYS, ...exports.THEAVYS, ...exports.CTHEAVYS];
//# sourceMappingURL=heavy.datamodel.js.map