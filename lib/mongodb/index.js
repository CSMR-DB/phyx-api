"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
require('dotenv').config();
var Database = /** @class */ (function () {
    function Database() {
        this.DBURL = process.env.DB_ROOT_URL;
        this.DBNAME = process.env.DB_COLLECTION_NAME;
        this._connect();
    }
    Database.prototype._connect = function () {
        mongoose_1.connect(this.DBURL + "/" + this.DBNAME, { useNewUrlParser: true, useCreateIndex: true })
            .then(function () {
            console.log('Database connection successful');
        })
            .catch(function (err) {
            console.error("Database connection error: " + err);
        });
    };
    return Database;
}());
exports.DATABASE = new Database();
