// import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata";
import { appDataSource } from "./config/data-source";

appDataSource
  .initialize()
  .then(async () => {
    console.log("DB connected");

    // Ejecutar migraciones automáticamente
    await appDataSource.runMigrations();
    console.log("Migrations applied");

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
