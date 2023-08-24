const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "yoroi-practical-project-db",
  password: "lQ1L49Mouw",
  port: 5432,
});

module.exports = pool;
