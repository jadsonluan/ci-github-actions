import { EntityBaseServiceManager } from "../../db/DatabaseManager";

export default async (): Promise<void> => {
  console.log('\n_______________________________________\n');
  console.log('Making database connection for tests...');
  console.log('_______________________________________\n');
  let dbManager: EntityBaseServiceManager;
  dbManager = new EntityBaseServiceManager();
  global.dbConnection = await dbManager.initDB();
  await dbManager.flushDatabase();
  await dbManager.closeDB();
};
