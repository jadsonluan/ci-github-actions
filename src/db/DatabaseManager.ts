import { Connection, getConnection } from "typeorm";
import db from ".";
import { NODE_ENV, DB_ENV } from "../config/environment";
import Movie from "../entities/Movie";
import fs from 'fs'

export default abstract class DatabaseManager {
  connection: Connection | undefined

  constructor(conn?: Connection) {
    this.connection = conn;
  }

  async initDB() {
    this.connection = await db.init()
    return this.connection
  }

  async closeDB() {
    await this.connection.close()
  }

  getDBManager() {
    if (this.connection) {
      return this.connection.manager
    }
    return getConnection(NODE_ENV).manager
  }

  getMovie() {
    return this.getDBManager().getRepository(Movie)
  }
}

export class EntityBaseServiceManager extends DatabaseManager {
  getMigrationFileNames() {
    const list: string[] = [];
    fs.readdirSync(DB_ENV.MIGRATIONS_FOLDER, {}).forEach((file) =>
      list.push(file.toString())
    );
    return list;
  }

  private async getMigration(
    name: string
  ): Promise<{ [key: string]: any } | undefined> {
    if (/.*(.ts|.js)$/.test(name)) {
      return import(`${DB_ENV.MIGRATIONS_FOLDER}/${name}`);
    } else {
      return undefined;
    }
  }

  /**
   * Custom function for run migrations
   * Experimental
   * WIP
   */
  async runMigrations() {
    const files = this.getMigrationFileNames();
    const queryRunner = this.getDBManager().connection.createQueryRunner();
    for (const name of files) {
      const migrationsObject = await this.getMigration(name);
      if (migrationsObject) {
        const keys = Object.keys(migrationsObject);
        for (const migrationKey of keys) {
          await new migrationsObject[migrationKey]()?.up(queryRunner);
        }
      }
    }
  }

  async flushDatabase() {
    const connection = await this.getDBManager().connection;

    await connection
      .createQueryRunner()
      .dropSchema(DB_ENV.DATABASE_SCHEMA, true, true);

    await connection
      .createQueryRunner()
      .createSchema(DB_ENV.DATABASE_SCHEMA, true);

    await connection.runMigrations();
  }
}
