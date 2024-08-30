import supertest from 'supertest'

import { app } from '@/server'

describe('List Measures Controller (Validations)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should not be able to filter by anything other than "water" or "gas"', async () => {
    const { status, body } = await supertest(app.server)
      .get('/customer/list?measure_type=test')
      .send()

    expect(status).toEqual(400)
    expect(body.error_code).toEqual('INVALID_TYPE')
    expect(body.error_description).toEqual('Tipo de medição não permitida')
  })
})
