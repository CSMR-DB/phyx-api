"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const budgetScenarios = {
    true: (item, budget, cost) => {
        // console.log(`%c Strat side: ${item} - Your budget (${budget}) is fine. You have spent ${cost}`, 'color: green')
        return true;
    },
    false: (item, budget, cost) => {
        throw new Error(`Strat side: ${item} - You have outspent your budget (${budget}) by spending a total of ${cost}`);
    }
};
const handleBudgetScenario = (scenario, item, budget, cost) => budgetScenarios[scenario](item, budget, cost); // Could obviously display a more generic message, if any
const validatePlayerCost = (player, budget) => {
    let result = false;
    try {
        const playerString = JSON.stringify(player);
        const costRegex = /(\Wcost\W:?\b\d*\b)/g;
        const PlayerCostsArray = playerString.match(costRegex);
        const playerTotalCost = PlayerCostsArray && PlayerCostsArray.map((cost) => Number(cost.replace(/\Wcost\W:?/g, '')));
        const totalPlayerCost = Number(playerTotalCost && playerTotalCost.reduce((pV, cV) => (pV += cV)));
        const withinBudget = Boolean(totalPlayerCost <= budget);
        handleBudgetScenario(String(withinBudget), player.name, budget, totalPlayerCost);
        result = withinBudget;
    }
    catch (e) {
        console.log(`%c Validation could not complete: ${e.message}`, 'color: red');
    }
    finally {
        return result;
    }
};
const costValidator = (strat) => {
    let result = false;
    const { budget, team: { players } } = strat;
    // validate total cost within budget for each player
    Object.keys(players).map((player) => {
        result = validatePlayerCost(players[player], budget);
    });
    return result;
};
exports.default = costValidator;
//# sourceMappingURL=cost-validator.js.map