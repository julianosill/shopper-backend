import supertest from 'supertest'

import { app } from '@/server'

describe('Confirm Measure Controller (Validations)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should not be able to confirm with measure_uuid as non-UUID string', async () => {
    const { status, body } = await supertest(app.server)
      .patch('/confirm')
      .send({
        measure_uuid: 'test',
        confirmed_value: 20,
      })

    expect(status).toEqual(400)
    expect(body.error_code).toEqual('INVALID_DATA')
    expect(body.error_description).toEqual('UUID de leitura inválido')
  })

  it('should not be able to confirm with confirmed_value as string', async () => {
    const { status, body } = await supertest(app.server)
      .patch('/confirm')
      .send({
        measure_uuid: 'daae2c04-1945-4777-9969-a4a2419ca822',
        confirmed_value: '20',
      })

    expect(status).toEqual(400)
    expect(body.error_code).toEqual('INVALID_DATA')
    expect(body.error_description).toEqual('O valor deve ser um número')
  })
})
