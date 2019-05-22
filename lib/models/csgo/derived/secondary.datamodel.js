"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const weapon_datamodel_1 = tslib_1.__importDefault(require("../base/weapon.datamodel"));
class SecondaryModel extends weapon_datamodel_1.default {
    constructor() {
        super(...arguments);
        this.slot = 'secondary';
        this.category = 'pistol';
    }
}
exports.SecondaryModel = SecondaryModel;
class SecondaryModelUNI extends SecondaryModel {
    constructor() {
        super(...arguments);
        this.side = 'UNI';
    }
}
exports.SecondaryModelUNI = SecondaryModelUNI;
class SecondaryModelATK extends SecondaryModel {
    constructor() {
        super(...arguments);
        this.side = 'ATK';
    }
}
exports.SecondaryModelATK = SecondaryModelATK;
class SecondaryModelDEF extends SecondaryModel {
    constructor() {
        super(...arguments);
        this.side = 'DEF';
    }
}
exports.SecondaryModelDEF = SecondaryModelDEF;
exports.DUALBERETTAS = new SecondaryModelUNI('Dual Berettas', 400);
exports.P250 = new SecondaryModelUNI('P-250', 300);
exports.DEAGLE = new SecondaryModelUNI('Desert Eagle', 700);
exports.R8 = new SecondaryModelUNI('R8 Revolver', 600);
exports.CZ75 = new SecondaryModelUNI('CZ-75', 500);
exports.GLOCK18 = new SecondaryModelATK('Glock-18', 0);
exports.TEC9 = new SecondaryModelATK('Tec-9', 500);
exports.USPS = new SecondaryModelDEF('USP-S', 0);
exports.P2000 = new SecondaryModelDEF('P-2000', 0);
exports.FIVESEVEN = new SecondaryModelDEF('Five-Seven', 5150);
exports.USECONDARIES = [exports.DUALBERETTAS, exports.P250, exports.DEAGLE, exports.R8, exports.CZ75];
exports.TSECONDARIES = [exports.GLOCK18, exports.TEC9, ...exports.USECONDARIES];
exports.CTSECONDARIES = [exports.USPS, exports.P2000, exports.FIVESEVEN, ...exports.USECONDARIES];
exports.ALLSECONDARIES = [...exports.USECONDARIES, ...exports.TSECONDARIES, ...exports.CTSECONDARIES];
const SECCONST = {
    name: 'Tec-9',
    id: 'TEC9',
    cost: 500
};
//# sourceMappingURL=secondary.datamodel.js.map