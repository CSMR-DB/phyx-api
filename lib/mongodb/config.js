"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
class Database {
    constructor() {
        this.DBURL = process.env.DB_ROOT_URL ||
            'mongodb://admin:xqiz8SMSwVH7T5v~ds223605.mlab.com:23605';
        this.DBNAME = 'phyx';
        this._connect();
    }
    _connect() {
        mongoose_1.default.connect(`${this.DBURL}/${this.DBNAME}`, { useNewUrlParser: true })
            .then(() => {
            console.log('Database connection successful');
        })
            .catch((err) => {
            console.error(`Database connection error: ${err}`);
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=config.js.map