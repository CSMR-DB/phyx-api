"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const weapon_datamodel_1 = tslib_1.__importDefault(require("../../base/weapon.datamodel"));
class SMGModel extends weapon_datamodel_1.default {
    constructor() {
        super(...arguments);
        this.slot = 'primary';
        this.category = 'smg';
    }
}
exports.SMGModel = SMGModel;
class SMGModelUNI extends SMGModel {
    constructor() {
        super(...arguments);
        this.side = 'UNI';
    }
}
exports.SMGModelUNI = SMGModelUNI;
class SMGModelATK extends SMGModel {
    constructor() {
        super(...arguments);
        this.side = 'ATK';
    }
}
exports.SMGModelATK = SMGModelATK;
class SMGModelDEF extends SMGModel {
    constructor() {
        super(...arguments);
        this.side = 'DEF';
    }
}
exports.SMGModelDEF = SMGModelDEF;
exports.MP7 = new SMGModelUNI('MP7', 1700);
exports.MP5SD = new SMGModelUNI('UMP5-SD', 4150);
exports.UMP45 = new SMGModelUNI('UMP-45', 1200);
exports.PPBIZON = new SMGModelUNI('PP-Bizon', 1800);
exports.P90 = new SMGModelUNI('P-90', 1750);
exports.MAC10 = new SMGModelATK('Mac-10', 1250);
exports.MP9 = new SMGModelDEF('MP9', 1250);
exports.USMGS = [exports.MP7, exports.MP5SD, exports.UMP45, exports.PPBIZON, exports.P90];
exports.TSMGS = [exports.MAC10, ...exports.USMGS];
exports.CTSMGS = [exports.MP9, ...exports.USMGS];
exports.ALLSMGS = [...exports.USMGS, ...exports.TSMGS, ...exports.CTSMGS];
//# sourceMappingURL=smg.datamodel.js.map