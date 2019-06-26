"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function csgoStrategyDataTransposer(strategy) {
    var players = strategy.team.players;
    // const playersArray: ICSGODocuments.Player[] = objectToArray(players)
    var loadoutArray = players.map(function (player) { return player['loadout']; });
    function uniqueIDs() {
        var items = loadoutArray
            .map(function (loadout) { return [
            loadout.primary || {},
            loadout.secondary
        ].concat((loadout.gear || []), (loadout.utilities || [])); })
            .reduce(function (pV, cV) { return pV.concat(cV); });
        var ids = items.map(function (item) { return item; });
        return Array.from(new Set(ids));
    }
    function slots() {
        var items = loadoutArray.map(function (loadout) { return ({
            slot: 'secondary',
            internal_id: loadout.secondary
        }); });
        loadoutArray.map(function (loadout) {
            if (loadout.primary) {
                items.push({
                    slot: 'primary',
                    internal_id: loadout.primary
                });
            }
            if (loadout.gear) {
                loadout.gear.map(function (id) {
                    if (id) {
                        items.push({
                            slot: 'gear',
                            internal_id: id
                        });
                    }
                });
            }
            if (loadout.utilities) {
                loadout.utilities.map(function (id) {
                    if (id) {
                        items.push({
                            slot: 'utilities',
                            internal_id: id
                        });
                    }
                });
            }
        });
        return Array.from(new Set(items.filter(function (item) { return item; })));
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
