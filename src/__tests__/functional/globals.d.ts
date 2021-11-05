declare namespace NodeJS {
  interface Global {
    supertest: import('supertest').SuperTest<import('supertest').Test>;
    testServer: import('../../server').default;
  }
}
