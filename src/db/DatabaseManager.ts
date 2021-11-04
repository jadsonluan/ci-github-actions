import { Connection, getConnection } from "typeorm";
import db from ".";
import { NODE_ENV } from "../config/environment";
import Movie from "../entities/Movie";

class DatabaseManager {
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

export default new DatabaseManager()