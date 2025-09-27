import { DataSource, Repository } from "typeorm";
import { Credential } from "../entities/Credentials.entity";
import { User } from "../entities/User.entity";
import { Appointment } from "../entities/Appointment.entity";

const isProd = process.env.NODE_ENV === "production";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

export const appDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  ssl: isProd ? { rejectUnauthorized: false } : false,
  synchronize: !isProd,
  logging: !isProd,
  entities: [User, Credential, Appointment],
  migrations: [__dirname + "/../migrations/*.{ts,js}"],
});

export const UserModel: Repository<User> = appDataSource.getRepository(User);
export const CredentialModel: Repository<Credential> =
  appDataSource.getRepository(Credential);
