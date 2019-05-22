"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const weapon_datamodel_1 = tslib_1.__importDefault(require("../../base/weapon.datamodel"));
class RifleModel extends weapon_datamodel_1.default {
    constructor() {
        super(...arguments);
        this.slot = 'primary';
        this.category = 'rifle';
    }
}
exports.RifleModel = RifleModel;
class RifleModelUNI extends RifleModel {
    constructor() {
        super(...arguments);
        this.side = 'UNI';
    }
}
exports.RifleModelUNI = RifleModelUNI;
class RifleModelATK extends RifleModel {
    constructor() {
        super(...arguments);
        this.side = 'ATK';
    }
}
exports.RifleModelATK = RifleModelATK;
class RifleModelDEF extends RifleModel {
    constructor() {
        super(...arguments);
        this.side = 'DEF';
    }
}
exports.RifleModelDEF = RifleModelDEF;
exports.SSG08 = new RifleModelUNI('SSG 08', 1700);
exports.AWP = new RifleModelUNI('AWP', 4750);
exports.AK47 = new RifleModelATK('AK-47', 2700);
exports.GALIL = new RifleModelATK('Galil AR', 2000);
exports.SG553 = new RifleModelATK('SG 553', 2750);
exports.G3SG1 = new RifleModelATK('G3SG1', 5150);
exports.M4A4 = new RifleModelDEF('M4A4', 3100);
exports.M4A1S = new RifleModelDEF('M4A1-S', 3100);
exports.FAMAS = new RifleModelDEF('Famas', 2250);
exports.AUG = new RifleModelDEF('AUG', 3150);
exports.SCAR20 = new RifleModelDEF('SCAR-20', 5150);
exports.URIFLES = [exports.SSG08, exports.AWP];
exports.TRIFLES = [exports.AK47, exports.GALIL, exports.SG553, exports.G3SG1, ...exports.URIFLES];
exports.CTRIFLES = [exports.M4A4, exports.M4A1S, exports.FAMAS, exports.AUG, exports.SCAR20, ...exports.URIFLES];
exports.ALLRIFLES = [...exports.URIFLES, ...exports.TRIFLES, ...exports.CTRIFLES];
console.log(exports.AK47);
console.log(exports.M4A4);
//# sourceMappingURL=rifle.datamodel.js.map