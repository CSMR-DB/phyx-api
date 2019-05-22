"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secondary_datamodel_1 = require("./derived/secondary.datamodel");
const rifle_datamodel_1 = require("./derived/primary/rifle.datamodel");
// abstract class CSGOLoadout implements ICSGOLoadout {
//   constructor(
//     public side: 'ATK' | 'DEF',
//     public secondary: SecondaryModel = GLOCK18,
//     public primary?: PrimaryModel,
//     public gear?: { cost: number; items: GearModel[] },
//     public utility?: { cost: number; items: UtilityModel[] }
//   ) {
//     // if (this.primary && this.side !== this.primary.side) {
//     //   throw new Error('yo, you cannot do this bruh')
//     // } else {
//     //   throw new Error('nice fam')
//     // }
//   }
// }
class CSGOLoadoutATK {
    constructor(secondary, primary, gear, utility) {
        this.secondary = secondary;
        this.primary = primary;
        this.gear = gear;
        this.utility = utility;
        this.side = 'ATK';
    }
}
exports.CSGOLoadoutATK = CSGOLoadoutATK;
class CSGOLoadoutDEF {
    constructor(secondary, primary, gear, utility) {
        this.secondary = secondary;
        this.primary = primary;
        this.gear = gear;
        this.utility = utility;
        this.side = 'DEF';
    }
}
exports.CSGOLoadoutDEF = CSGOLoadoutDEF;
const goodLoadout = new CSGOLoadoutATK(secondary_datamodel_1.GLOCK18, rifle_datamodel_1.AK47);
const alsoGoodLoadout = new CSGOLoadoutDEF({ name: 'P2000', id: 'P2000', cost: 0, side: 'DEF', slot: 'secondary', category: 'pistol' }, rifle_datamodel_1.M4A4);
console.log('nice', goodLoadout);
console.log('not so nice', alsoGoodLoadout);
// export default CSGOLoadout
//# sourceMappingURL=loadout.model.js.map