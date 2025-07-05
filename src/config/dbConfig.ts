import { Pool } from 'pg';
require('dotenv').config()

const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBSERVER,
    database: process.env.DBNAME,
    password:  process.env.DBPASSWORD,
    port: 5432,
})

export default {
  pool
}
