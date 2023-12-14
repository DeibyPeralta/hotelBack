"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    server: process.env.DBSERVER || '',
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    requestTimeout: 1200000,
    connectionTimeout: 350000,
    options: {
        encrypt: false,
        enableArithAbort: false,
        useUTC: true
    },
    pool: {
        min: 1,
        max: 800
    }
};
