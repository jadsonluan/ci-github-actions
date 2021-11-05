import Express, { Application, NextFunction, Request, Response } from 'express'
import http from 'http'
import { Connection } from 'typeorm';

import db from './db';
import movieRouter from './routes/movies'
import { EntityBaseServiceManager } from './db/DatabaseManager';
import { NODE_ENV } from './config/environment';

class Server {
  private app: Application
  private port: number;
  private appName: string;
  private httpServer: http.Server;
  private entityBaseServiceManager: EntityBaseServiceManager;
  private dbconnection: Connection | undefined;

  constructor(port = 8080, appName = 'nodejs-server') {
    this.port = port
    this.appName = appName
    this.app = Express()
    this.httpServer = http.createServer(this.app)
    this.entityBaseServiceManager = new EntityBaseServiceManager()
  }

  public async init(): Promise<void> {
    try {
      this.dbconnection = await db.init();
      this.setupExpress();
      this.setupRoutes()
      this.setupListeners()
    } catch (error) {
      console.info('🔥 API init error: ', error);
    }
  }

  public async flushDatabase() {
    await this.entityBaseServiceManager.flushDatabase();
  }

  public async runMigrations() {
    await this.entityBaseServiceManager.runMigrations();
  }

  public async close(): Promise<void> {
    await this.dbconnection?.close();

    await new Promise((resolve, _reject) => {
      this.httpServer.close(() => resolve(true));
    });

    console.info(`Server (${this.appName}) closed with success`);
  }

  private setupExpress(): void {
    this.app.use(Express.json());
    this.app.use(Express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.app.use('/movies', movieRouter);
  }

  private setupListeners(): void {
    this.app.on('connection', () =>
      console.info(`🚀 Server connected on port: ${this.port}`)
    );
    this.app.on('close', () => console.info('Server closed.'));
    this.app.on('error', (err) => console.info(`Server error: ${err}`));
    this.app.on('listening', () => console.info('Server listening...'));
    this.httpServer.listen(this.port, () =>
      console.info(
        `🚀 [${NODE_ENV}] Server connected on port: ${this.port}`
      )
    );
  }

  public getApp() {
    return this.app
  }
}

export default Server
