import supertest from 'supertest';

export const app = global.testServer.getApp();

export const get = async (url = '', headers: Record<any, any>) => {
  return supertest(app).get(url).set(headers);
};

export const post = async (url = '', body: any, headers: Record<any, any>) => {
  return supertest(app).post(url).set(headers).send(body);
};

export const put = async (url = '', body: any, headers: Record<any, any>) => {
  return supertest(app).put(url).set(headers).send(body);
};

export const remove = async (url = '', headers: Record<any, any>) => {
  return supertest(app).delete(url).set(headers);
};
