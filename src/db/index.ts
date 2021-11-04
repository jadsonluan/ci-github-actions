import { createConnection } from "typeorm";
import { DB_ENV, NODE_ENV } from "../config/environment";
import entities from "../entities";

export default {
  init: () =>
    createConnection({
      name: NODE_ENV,
      type: 'postgres',
      synchronize: false,
      migrationsRun: false,
      host: DB_ENV.DATABASE_HOST,
      port: DB_ENV.DATABASE_PORT ? parseInt(DB_ENV.DATABASE_PORT) : 5432,
      username: DB_ENV.DATABASE_USER,
      password: DB_ENV.DATABASE_PASSWORD,
      database: DB_ENV.DATABASE_NAME,
      schema: DB_ENV.DATABASE_SCHEMA,
      entities: Object.values(entities),
      migrations: [`${DB_ENV.MIGRATIONS_FOLDER}/*.{ts,js}`],
      cli: {
        entitiesDir: DB_ENV.CLI.ENTITIES_FOLDER,
        migrationsDir: DB_ENV.CLI.MIGRATIONS_FOLDER,
      },
      logging: DB_ENV.DATABASE_LOG,
      useUTC: true,
    }),
};