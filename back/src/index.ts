// import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata";
import { appDataSource } from "./config/data-source";

appDataSource
  .initialize()
  .then(() => {
    console.log("Conexion a la DB exitosa");
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`server listening on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
