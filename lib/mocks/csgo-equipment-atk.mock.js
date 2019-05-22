"use strict";
class WeaponT {
    constructor(name, cost) { }
}
WeaponT.side = 'T';
//
var PistolTEnum;
(function (PistolTEnum) {
    PistolTEnum[PistolTEnum["Glock"] = 0] = "Glock";
    PistolTEnum[PistolTEnum["P250"] = 1] = "P250";
    PistolTEnum[PistolTEnum["Dualies"] = 2] = "Dualies";
    PistolTEnum[PistolTEnum["Tec9"] = 3] = "Tec9";
    PistolTEnum[PistolTEnum["CZ75"] = 4] = "CZ75";
    PistolTEnum[PistolTEnum["Deagle"] = 5] = "Deagle";
    PistolTEnum[PistolTEnum["R8"] = 6] = "R8";
})(PistolTEnum || (PistolTEnum = {}));
// class PistolT extends WeaponT {
//   private static category = 'PistolT'
// }
// const GLOCK18 = new PistolT('Glock-18', 0)
// enum PISTOLTYPEDENUM {
//   GLOCK18TYPED,
//   P250TYPED
// }
//
var RifleTEnum;
(function (RifleTEnum) {
    RifleTEnum[RifleTEnum["AK47"] = 0] = "AK47";
    RifleTEnum[RifleTEnum["Galil"] = 1] = "Galil";
    RifleTEnum[RifleTEnum["SG551"] = 2] = "SG551";
    RifleTEnum[RifleTEnum["SSG01"] = 3] = "SSG01";
    RifleTEnum[RifleTEnum["AWP"] = 4] = "AWP";
})(RifleTEnum || (RifleTEnum = {}));
class RifleT extends WeaponT {
}
RifleT.category = 'RifleT';
const AK47 = new RifleT('AK-47', 2700);
//
var HeavyTEnum;
(function (HeavyTEnum) {
    HeavyTEnum[HeavyTEnum["Sawedoff"] = 0] = "Sawedoff";
    HeavyTEnum[HeavyTEnum["XM1018"] = 1] = "XM1018";
    HeavyTEnum[HeavyTEnum["Nova"] = 2] = "Nova";
    HeavyTEnum[HeavyTEnum["Negev"] = 3] = "Negev";
    HeavyTEnum[HeavyTEnum["M249"] = 4] = "M249";
})(HeavyTEnum || (HeavyTEnum = {}));
class HeavyT extends WeaponT {
}
HeavyT.category = 'HeavyT';
const SAWEDOFF = new HeavyT('Sawed-off', 1500);
//
var SMGTEnum;
(function (SMGTEnum) {
    SMGTEnum[SMGTEnum["Mac10"] = 0] = "Mac10";
    SMGTEnum[SMGTEnum["UMP45"] = 1] = "UMP45";
    SMGTEnum[SMGTEnum["MP7"] = 2] = "MP7";
    SMGTEnum[SMGTEnum["MP5SD"] = 3] = "MP5SD";
    SMGTEnum[SMGTEnum["PPBizon"] = 4] = "PPBizon";
})(SMGTEnum || (SMGTEnum = {}));
class SMGT extends WeaponT {
}
SMGT.category = 'SMG';
const MAC10 = new SMGT('Mac-10', 1050);
//# sourceMappingURL=csgo-equipment-atk.mock.js.map