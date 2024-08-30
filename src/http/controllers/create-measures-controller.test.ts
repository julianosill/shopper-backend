import supertest from 'supertest'

import { app } from '@/server'
import { invalidBase64Image, validBase64Image } from '@/tests/mocks'

describe('Create Measures Controller (Validations)', () => {
  const route = '/upload'

  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  it('should not be able to upload an image that is not a base64 string', async () => {
    const { status, body } = await supertest(app.server).post(route).send({
      image: invalidBase64Image,
      customer_code: 'customer',
      measure_datetime: '2024-08-29T00:00:00.000Z',
      measure_type: 'WATER',
    })

    expect(status).toEqual(400)
    expect(body.error_code).toEqual('INVALID_DATA')
    expect(body.error_description).toEqual('Imagem inválida')
  })

  it('should not be able to upload with measure_datetime that is not a valid datetime', async () => {
    const { status, body } = await supertest(app.server).post(route).send({
      image: validBase64Image,
      customer_code: 'customer',
      measure_datetime: '2024-08-29T00:00:00000',
      measure_type: 'WATER',
    })

    expect(status).toEqual(400)
    expect(body.error_code).toEqual('INVALID_DATA')
    expect(body.error_description).toEqual('Data de leitura inválida')
  })

  it('should not be able to upload with measure_type other than "WATER" or "GAS"', async () => {
    const { status, body } = await supertest(app.server).post(route).send({
      image: validBase64Image,
      customer_code: 'customer',
      measure_datetime: '2024-08-29T00:00:00.000Z',
      measure_type: 'TEST',
    })

    expect(status).toEqual(400)
    expect(body.error_code).toEqual('INVALID_DATA')
    expect(body.error_description).toEqual('Tipo de medição não permitida')
  })

  it('should not be able to upload with measure_type as "Gas"', async () => {
    const { status, body } = await supertest(app.server).post(route).send({
      image: validBase64Image,
      customer_code: 'customer',
      measure_datetime: '2024-08-29T00:00:00.000Z',
      measure_type: 'Gas',
    })

    expect(status).toEqual(400)
    expect(body.error_code).toEqual('INVALID_DATA')
    expect(body.error_description).toEqual('Tipo de medição não permitida')
  })
})
