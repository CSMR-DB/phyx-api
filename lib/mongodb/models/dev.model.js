"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const HeySchema = new mongoose_1.Schema({
    hi: String,
    like: Number
});
const MongooseSchemaDev = new mongoose_1.Schema({
    value: String,
    date: String,
    some: String,
    kek: {
        lol: String,
        hey: [HeySchema]
    }
});
const MongooseModelDev = mongoose_1.default.model('dev', MongooseSchemaDev, 'dev');
exports.default = MongooseModelDev;
//# sourceMappingURL=dev.model.js.map