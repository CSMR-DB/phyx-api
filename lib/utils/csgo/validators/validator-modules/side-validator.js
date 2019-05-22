"use strict";
// const sideSizeScenarios: { [key: string]: (item: string) => any } = {
//   '1': (item: string) => {
//     // console.log(`%c Strat side: ${item} - Sides match, all is good`, 'color: green')
//     return true
//   },
//   '2': (item: string) => {
//     throw new Error(`Strat side: ${item} - Sides do not match, so you must have some invalid items submitted in your strat`)
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
const sideSizeScenarios = {
    '1': (item) => {
        // console.log(`%c Strat side: ${item} - Sides match, all is good`, 'color: green')
        return true;
    },
    '2': (item) => {
        // console.log(`%c Strat side: ${item} - Sides match, all is good`, 'color: green')
        return true;
    },
    '3': (item) => {
        throw new Error(`Strat side: ${item} - Sides do not match, so you must have some invalid items submitted in your strat`);
    }
};
const returnOnSize = (scenario, item) => sideSizeScenarios[scenario](item);
const validatePlayerSide = (player, stratSide) => {
    const { loadout: { primary, secondary, gear, utilities } } = player;
    let result = false;
    try {
        const primarySide = new Set([primary && primary.side]);
        const secondarySide = new Set(Array(secondary && secondary.side));
        const gearSideArray = new Set(gear && gear.map((item) => item.side));
        const utilitySideArray = new Set(utilities && utilities.map((item) => item.side));
        const sideSet = new Set((function* () {
            yield* primarySide, yield* secondarySide, yield* gearSideArray, yield* utilitySideArray;
        })());
        console.log(sideSet);
        result = returnOnSize(String(sideSet.size), stratSide);
    }
    catch (e) {
        console.log(`%c Validation could not complete: ${e.message}`, 'color: red');
    }
    finally {
        return result;
    }
};
const sideValidator = (strat) => {
    let result = false;
    const { side, team: { players } } = strat;
    Object.keys(players).map((player) => {
        result = validatePlayerSide(players[player], side);
    });
    return result;
};
exports.default = sideValidator;
//# sourceMappingURL=side-validator.js.map