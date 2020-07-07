import request from 'supertest';

import app from '../app';

describe('Route', () => {
  it('should be able to create a new route', async () => {
    const response = await request(app).post('/routes').send({
      origem: 'AAA',
      destino: 'BBB',
      custo: 20,
    });

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      origem: 'AAA',
      destino: 'BBB',
      custo: 20,
    });
  });

  it('should not be able to create a new route without sending origem field', async () => {
    const response = await request(app).post('/routes').send({
      destino: 'BBB',
      custo: 20,
    });

    expect(response.status).toEqual(400);
  });

  it('should not be able to create a new route without sending destino field', async () => {
    const response = await request(app).post('/routes').send({
      origem: 'AAA',
      custo: 20,
    });

    expect(response.status).toEqual(400);
  });

  it('should not be able to create a new route without sending custo field', async () => {
    const response = await request(app).post('/routes').send({
      origem: 'AAA',
      destino: 'BBB',
    });

    expect(response.status).toEqual(400);
  });

  it('should be able to get the best route between two locations', async () => {
    await request(app).post('/routes').send({
      origem: 'EEE',
      destino: 'FFF',
      custo: 25,
    });
    await request(app).post('/routes').send({
      origem: 'FFF',
      destino: 'GGG',
      custo: 15,
    });

    const response = await request(app).get('/routes/?origem=EEE&destino=GGG');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual('EEE-FFF-GGG > 40');
  });

  it('should not be able to get the best route between two locations without sending the origem field', async () => {
    const response = await request(app).get('/routes/?destino=CDG');

    expect(response.status).toEqual(400);
  });

  it('should not be able to get the best route between two locations without sending the destino field', async () => {
    const response = await request(app).get('/routes/?origem=GRU');

    expect(response.status).toEqual(400);
  });

  it('should not be able to get the best route between two locations that do not link each other', async () => {
    const response = await request(app).get('/routes/?origem=GRU&destino=AAA');

    expect(response.status).toEqual(400);
  });
});
