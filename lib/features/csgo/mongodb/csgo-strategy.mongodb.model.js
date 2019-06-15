"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Item = new mongoose_1.Schema({
    internal_id: String
}, { _id: false });
var Loadout = new mongoose_1.Schema({
    secondary: {
        type: Item,
        required: true
    },
    primary: Item,
    gear: [Item],
    utilities: [Item]
}, { _id: false });
var Position = new mongoose_1.Schema({
    x: Number,
    y: Number
}, { _id: false });
var Player = function (color) {
    return new mongoose_1.Schema({
        internal_id: String,
        color: {
            type: String,
            default: color
        },
        name: { type: String, required: true, maxlength: 24 },
        role: {
            type: String,
            enum: ['AWPer', 'Support', 'Entry Fragger', 'Lurker', 'IGL'],
            default: 'Support'
        },
        loadout: Loadout,
        positions: { type: [Position], required: true }
    }, { _id: false });
};
var Players = new mongoose_1.Schema({
    player_1: { type: Player('blue'), required: true },
    player_2: { type: Player('purple'), required: true },
    player_3: { type: Player('green'), required: true },
    player_4: { type: Player('orange'), required: true },
    player_5: { type: Player('yellow'), required: true }
}, { _id: false });
var Team = new mongoose_1.Schema({
    team_id: String,
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    players: { type: Players, required: true }
}, { _id: false });
var schema = new mongoose_1.Schema({
    _id: {
        type: String,
        auto: false
    },
    map: {
        type: String,
        required: true
    },
    name: {
        type: String,
        maxlength: 18,
        required: true
    },
    description: String,
    side: {
        type: String,
        enum: ['ATK', 'DEF'],
        required: true
    },
    budget: {
        type: Number,
        min: 0,
        max: 16000,
        required: true
    },
    team: {
        type: Team,
        required: true
    }
});
exports.MongooseModelCSGOStrategy = mongoose_1.model('csgo', schema, 'csgo');
