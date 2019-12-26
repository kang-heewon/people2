import path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import DatabaseNamingStrategy from "./NamingStrategy";
import "../utils/env";
import signale from "signale";
signale.info(`${path.join(__dirname, "..", "models")}/*.ts`);
const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  namingStrategy: new DatabaseNamingStrategy(),
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  entities: [`${path.join(__dirname, "..", "models")}/**.[tj]s`],
  migrations: [`${path.join(__dirname, "..", "models")}/migration/**.[tj]s`]
};

export { typeOrmConfig };
