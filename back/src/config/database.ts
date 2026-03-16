import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

// ✅ Probá la conexión al iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error detallado:", err.message);
    console.error(
      "URL usada:",
      process.env.DATABASE_URL?.replace(/:([^:@]+)@/, ":***@")
    ); // oculta la password
    return;
  }
  console.log("✅ Conectado a Render exitosamente");
  release();
});
