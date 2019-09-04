"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require('dotenv').config();
class Database {
    constructor() {
        this.DBURL = process.env.DB_ROOT_URL || 'mongodb://localhost:27017';
        this.DBNAME = process.env.DB_COLLECTION_NAME || 'phyx_api';
        this._connect();
    }
    _connect() {
        mongoose_1.connect(`${this.DBURL}/${this.DBNAME}`, { useNewUrlParser: true, useCreateIndex: true })
            .then(() => {
            console.log('Database connection successful');
        })
            .catch((err) => {
            console.error(`Database connection error: ${err}`);
        });
    }
}
exports.DATABASE = new Database();
