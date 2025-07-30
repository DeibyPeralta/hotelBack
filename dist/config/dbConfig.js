"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require('dotenv').config();
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
