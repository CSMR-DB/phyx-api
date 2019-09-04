"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function csgoStrategyDataTransposer(strategy) {
    const { team: { players } } = strategy;
    const loadoutArray = players.map((player) => player['loadout']);
    function uniqueIDs() {
        const items = loadoutArray
            .map((loadout) => [
            loadout.primary || {},
            loadout.secondary,
            ...(loadout.gear || []),
            ...(loadout.utilities || [])
        ])
            .reduce((pV, cV) => pV.concat(cV));
        const ids = items.map((item) => item);
        return Array.from(new Set(ids));
    }
    function slots() {
        const items = loadoutArray.map((loadout) => ({
            slot: 'secondary',
            internal_id: loadout.secondary
        }));
        loadoutArray.map((loadout) => {
            if (loadout.primary) {
                items.push({
                    slot: 'primary',
                    internal_id: loadout.primary
                });
            }
            if (loadout.gear) {
                loadout.gear.map((id) => {
                    if (id) {
                        items.push({
                            slot: 'gear',
                            internal_id: id
                        });
                    }
                });
            }
            if (loadout.utilities) {
                loadout.utilities.map((id) => {
                    if (id) {
                        items.push({
                            slot: 'utilities',
                            internal_id: id
                        });
                    }
                });
            }
        });
        return Array.from(new Set(items.filter((item) => item)));
    }
    return Object.freeze({
        uniqueIDs: uniqueIDs(),
        slots: slots(),
        map: strategy.map,
        side: strategy.side,
        budget: strategy.budget
    });
}
exports.csgoStrategyDataTransposer = csgoStrategyDataTransposer;
