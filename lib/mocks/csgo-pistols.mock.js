"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GLOCK18 = {
    side: 'T',
    id: 'GLOCK18',
    name: 'Glock-18',
    cost: 0
};
const TEC9 = {
    side: 'T',
    id: 'TEC9',
    name: 'Tec-9',
    cost: 500
};
const USPS = {
    side: 'CT',
    id: 'USPS',
    name: 'USP-S',
    cost: 0
};
const P2000 = {
    side: 'CT',
    id: 'P2000',
    name: 'P-2000',
    cost: 0
};
const P250 = {
    side: 'U',
    id: 'P250',
    name: 'P-250',
    cost: 300
};
const DUALIES = {
    side: 'U',
    id: 'DUALBERETTAS',
    name: 'Dual Berettas',
    cost: 400
};
const CZ75 = {
    side: 'U',
    id: 'CZ75',
    name: 'CZ-75',
    cost: 500
};
const DEAGLE = {
    side: 'U',
    id: 'DEAGLE',
    name: 'Desert Eagle',
    cost: 700
};
const R8 = {
    side: 'U',
    id: 'R8',
    name: 'R8 Revolver',
    cost: 600
};
exports.UPISTOLS = [P250, DUALIES, CZ75, DEAGLE, R8];
exports.TPISTOLS = [GLOCK18, TEC9, ...exports.UPISTOLS];
exports.CTPISTOLS = [USPS, P2000, ...exports.UPISTOLS];
exports.ALLPISTOLS = new Set([
    ...exports.TPISTOLS,
    ...exports.CTPISTOLS
]);
// console.log(TPISTOLS)
// console.log(CTPISTOLS)
// console.log(UPISTOLS)
console.log(exports.ALLPISTOLS);
//# sourceMappingURL=csgo-pistols.mock.js.map