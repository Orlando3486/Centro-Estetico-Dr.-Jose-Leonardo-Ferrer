import { PORT } from "./config/envs";
import "dotenv/config";
import server from "./server";
import "reflect-metadata";
import { appDataSource } from "./config/data-source";

appDataSource
  .initialize()
  .then(async () => {
    console.log("DB connected");

    await appDataSource.runMigrations();
    console.log("Migrations applied");

    server.listen(PORT || 3000, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
