"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var Database = /** ~class */ (function () {
    function Database() {
        this.DBURL = process.env.DB_ROOT_URL || 'mongodb://admin:xqiz8SMSwVH7T5v~ds223605.mlab.com:23605';
        this.DBNAME = process.env.DB_COLLECTION_NAME || 'phyx';
        this._connect();
    }
    Database.prototype._connect = function () {
        mongoose_1.default.connect(this.DBURL + "/" + this.DBNAME, { useNewUrlParser: true })
            .then(function () {
            console.log('Database connection successful');
        })
            .catch(function (err) {
            console.error("Database connection error: " + err);
        });
    };
    return Database;
}());
exports.default = new Database();
