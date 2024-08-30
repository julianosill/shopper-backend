import { ConfirmationDuplicate, MeasureNotFoundError } from '@/http/errors'
import { InMemoryMeasuresRepository } from '@/repositories/in-memory'

import { ConfirmMeasureService } from './confirm-measure-service'

let measuresRepository: InMemoryMeasuresRepository
let sut: ConfirmMeasureService

describe('Confirm Measure Service', () => {
  beforeAll(async () => {
    measuresRepository = new InMemoryMeasuresRepository()
    sut = new ConfirmMeasureService(measuresRepository)
  })

  beforeEach(async () => {
    measuresRepository.items = []
  })

  it('should be able to confirm a measure', async () => {
    const { measure_uuid } = await measuresRepository.createMeasure({
      measure_value: 123,
      measure_datetime: new Date('2024-08-29T00:00:00.000Z'),
      measure_type: 'WATER',
      image_url: 'image_url',
      customer_code: 'customer_code_test',
    })

    const result = await sut.execute({
      confirmed_value: 50,
      measure_uuid,
    })

    expect(result.success).toEqual(true)
  })

  it('should not be able to confirm a inexistent measure', async () => {
    await expect(() =>
      sut.execute({ confirmed_value: 50, measure_uuid: 'measure_uuid' }),
    ).rejects.toBeInstanceOf(MeasureNotFoundError)
  })

  it('should not be able to confirm a measure already confirmed', async () => {
    const { measure_uuid } = await measuresRepository.createMeasure({
      measure_value: 123,
      measure_datetime: new Date('2024-08-29T00:00:00.000Z'),
      measure_type: 'WATER',
      image_url: 'image_url',
      customer_code: 'customer_code_test',
    })

    await sut.execute({ confirmed_value: 50, measure_uuid })

    await expect(() =>
      sut.execute({ confirmed_value: 50, measure_uuid }),
    ).rejects.toBeInstanceOf(ConfirmationDuplicate)
  })
})
