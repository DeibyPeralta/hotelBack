"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.DBUSER,
    host: process.env.DBSERVER,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: 5432,
});
exports.default = {
    pool
};
// export default  {  
//   server: process.env.DBSERVER || '',
//   database:  process.env.DBNAME,
//   user: process.env.DBUSER,
//   password: process.env.DBPASSWORD,
//   requestTimeout: 1200000,
//   connectionTimeout: 350000,
//   options: {
//     encrypt: false,
//     enableArithAbort: false, // Works message gone
//     useUTC: true
//   },
//   pool: {
//     min: 1,
//     max: 800
//   }
// };
