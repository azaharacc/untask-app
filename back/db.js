// import postgresql cli from pg module
const { Pool } = require('pg');
// verify env variable 
if (!process.env.DATABASE_TASKS) {
  throw new Error("❌ DATABASE_TASKS no está definida en las variables de entorno");
}
// new connection to postgresql
const pool = new Pool({
  connectionString: process.env.DATABASE_TASKS,
  ssl: { rejectUnauthorized: false },
});
// export to make queries possible
module.exports = pool;
