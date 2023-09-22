import { Pool } from "pg";

export const PgPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "yoroi-practical-project-db",
  password: "lQ1L49Mouw",
  port: 5432,
});
