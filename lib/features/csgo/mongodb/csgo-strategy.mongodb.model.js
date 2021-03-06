"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Loadout = new mongoose_1.Schema({
    secondary: {
        type: String,
        required: true,
        ref: 'csgo_item'
    },
    primary: {
        type: String,
        ref: 'csgo_item'
    },
    gear: [
        {
            type: String,
            ref: 'csgo_item'
        }
    ],
    utilities: [
        {
            type: String,
            ref: 'csgo_item'
        }
    ]
}, { _id: false });
const Position = new mongoose_1.Schema({
    x: Number,
    y: Number
}, { _id: false });
const Player = new mongoose_1.Schema({
    internal_id: String,
    color: {
        type: String,
        enum: ['blue', 'purple', 'green', 'orange', 'yellow']
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
const Team = new mongoose_1.Schema({
    team_id: String,
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    players: {
        type: [Player],
        required: true,
        validate: [
            (val) => val.length === 5,
            '{PATH} has too many players'
        ]
    }
}, { _id: false });
const schema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.SchemaTypes.ObjectId,
        auto: true
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
}, { timestamps: true });
const autoPopulateItems = function (next) {
    this.populate('team.players.loadout.primary');
    this.populate('team.players.loadout.secondary');
    this.populate('team.players.loadout.gear');
    this.populate('team.players.loadout.utilities');
    next();
};
schema.pre('find', autoPopulateItems);
schema.pre('findOne', autoPopulateItems);
exports.MongooseModelCSGOStrategy = mongoose_1.model('csgo_strategy', schema, 'csgo_strategies');
