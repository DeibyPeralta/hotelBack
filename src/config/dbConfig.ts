import { Pool } from 'pg';

require('dotenv').config()

const pool = new Pool({
  connectionString: "postgres://default:fHt1YXKh8vwE@ep-dry-mode-31547801-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})

// const pool = new Pool({
//     user: process.env.DBUSER,
//     host: process.env.DBSERVER,
//     database: process.env.DBNAME,
//     password:  process.env.DBPASSWORD,
//     port: 5432,
// })

export default {
  pool
}
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