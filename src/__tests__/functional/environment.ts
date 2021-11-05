import Server from '../../server';
import JestEnvironment from 'jest-environment-node';

export default class Environment extends JestEnvironment {
  constructor(config: any) {
    super(config as any);
  }

  async setup() {
    this.global.testServer = new Server(8181);
    await this.global.global.testServer.init();
    await this.global.global.testServer.flushDatabase();
    await super.setup();
  }

  async teardown() {
    await this.global.global.testServer.close();
  }
}
