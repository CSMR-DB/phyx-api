"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationReturns = {
    true: (item) => {
        // console.log(`%c ${JSON.stringify(item)} is valid`, 'color: green')
        return true;
    },
    false: (item) => {
        throw new Error(`${JSON.stringify(item)} is not valid`);
    }
};
const returnOnValidation = (label, item) => validationReturns[label.toString()](item);
const validateItem = (itemToValidate, items) => {
    let result = false;
    try {
        // items.map(() => {
        const itemExists = items.find((item) => JSON.stringify(itemToValidate) === JSON.stringify(item)) !== undefined;
        result = returnOnValidation(itemExists, itemToValidate);
        // })
        // console.log('validation concluded successfully')
    }
    catch (e) {
        console.log(`%c Validation aborted: ${e.message}`, 'color: red');
    }
    finally {
        // console.log(result)
        return result;
    }
};
exports.default = validateItem;
// export const findLoadoutItemBySide = (loadoutItem: { side: string }[], side: string) =>
// [ ...loadoutItem ].filter((pistol) => pistol.side === side || pistol.side === 'U')
//# sourceMappingURL=item-validator.js.map