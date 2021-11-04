const { DB_ENV, NODE_ENV } = require('./src/config/environment.ts')

module.exports = {
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
  entities: [`${DB_ENV.ENTITIES_FOLDER}/*.{ts,js}`],
  migrations: [`${DB_ENV.MIGRATIONS_FOLDER}/*.{ts,js}`],
  cli: {
    entitiesDir: DB_ENV.CLI.ENTITIES_FOLDER,
    migrationsDir: DB_ENV.CLI.MIGRATIONS_FOLDER,
  },
  logging: DB_ENV.DATABASE_LOG,
};
