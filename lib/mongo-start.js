"use strict";
// import { MongoClient } from 'mongodb'
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DBURL = 'mongodb://admin:xqiz8SMSwVH7T5v~ds223605.mlab.com:23605';
const DBNAME = 'phyx';
// const CLIENT = new MongoClient(DBURL, { useNewUrlParser: true })
// // ===================
// let returnDocs: any
// CLIENT.connect((err) => {
//   // console.error(err)
//   console.log(`Connected to ${DBURL}/${DBNAME}`)
//   const PHYX = CLIENT.db(DBNAME)
//   const DEV = PHYX.collection('dev')
//   console.log(
//     DEV.find({}).toArray((colErr, docs) => {
//       // if (colErr) throw colErr
//       console.log(JSON.stringify(docs))
//       returnDocs = JSON.stringify(docs)
//     })
//   )
// })
// console.log(returnDocs)
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
mongoose_1.default.connect(`${DBURL}/${DBNAME}`);
mongoose_1.default.connection.once('open', () => {
    console.log(`Connected to ${DBURL}/${DBNAME}`);
});
//# sourceMappingURL=mongo-start.js.map