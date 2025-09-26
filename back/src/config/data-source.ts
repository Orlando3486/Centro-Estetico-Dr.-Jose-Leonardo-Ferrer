import { DataSource, Repository } from "typeorm";
import {
  DB_DATABASE,
  DB_DROP,
  DB_HOST,
  DB_LOGGING,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNCHRONIZE,
  DB_USERNAME,
} from "./envs";
import { Credential } from "../entities/Credentials.entity";
import { User } from "../entities/User.entity";
import { Appointment } from "../entities/Appointment.entity";

export const appDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST!,
  port: DB_PORT!,
  username: DB_USERNAME!,
  password: DB_PASSWORD!,
  database: DB_DATABASE!,
  synchronize: DB_SYNCHRONIZE,
  dropSchema: DB_DROP,
  logging: DB_LOGGING,
  entities: [User, Credential, Appointment],
});

export const UserModel: Repository<User> = appDataSource.getRepository(User);

export const CredentialModel: Repository<Credential> =
  appDataSource.getRepository(Credential);
