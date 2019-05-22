"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importStar(require("mongoose"));
var GearDetails = new mongoose_1.Schema({
    cost: Number,
    equipped: Boolean
});
var Utility = function (price, max) {
    return new mongoose_1.Schema({
        cost: Number,
        price: {
            type: Number,
            default: price
        },
        equipped: {
            type: Number,
            max: max
        }
    });
};
var Utilities = new mongoose_1.Schema({
    cost: Number,
    smoke: Utility(300, 1),
    flash: Utility(200, 2),
    frag: Utility(300, 1),
    fire: Utility(400, 1),
    decoy: Utility(50, 1)
});
var Primary = new mongoose_1.Schema({
    cost: Number,
    name: String,
    category: {
        type: String,
        enum: ['Rifle', 'Heavy', 'SMG']
    }
});
var Gear = new mongoose_1.Schema({
    cost: Number,
    kevlar: GearDetails,
    helmet: GearDetails,
    zeus: GearDetails
});
var Secondary = new mongoose_1.Schema({
    cost: Number,
    name: String
});
var Loadout = new mongoose_1.Schema({
    cost: Number,
    secondary: {
        type: Secondary,
        required: true
    },
    primary: Primary,
    gear: Gear,
    utilities: Utilities
});
var Position = new mongoose_1.Schema({
    x: Number,
    y: Number
});
var Player = function (color) {
    return new mongoose_1.Schema({
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
    });
};
var Players = new mongoose_1.Schema({
    player_1: { type: Player('blue'), required: true },
    player_2: { type: Player('purple'), required: true },
    player_3: { type: Player('green'), required: true },
    player_4: { type: Player('orange'), required: true },
    player_5: { type: Player('yellow'), required: true }
});
var Team = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    players: { type: Players, required: true }
});
var schema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    economy: {
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
var MongooseModelCSGOStrategy = mongoose_1.default.model('csgo', schema, 'csgo');
exports.default = MongooseModelCSGOStrategy;
