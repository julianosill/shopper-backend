import { MeasuresNotFoundError } from '@/http/errors'
import { InMemoryMeasuresRepository } from '@/repositories/in-memory'

import { ListMeasuresService } from './list-measures-service'

let measuresRepository: InMemoryMeasuresRepository
let sut: ListMeasuresService

describe('List Measures Service', () => {
  beforeAll(async () => {
    measuresRepository = new InMemoryMeasuresRepository()
    sut = new ListMeasuresService(measuresRepository)
  })

  beforeEach(async () => {
    measuresRepository.items = []
  })

  it('should be able to list measures', async () => {
    const numberOfMeasuresToCreate = 3
    const customerCode = 'customer_code'

    for (let i = 1; i <= numberOfMeasuresToCreate; i++) {
      await measuresRepository.createMeasure({
        measure_value: 123,
        measure_datetime: new Date(`2024-0${i}-29T00:00:00.000Z`),
        measure_type: 'WATER',
        image_url: 'image_url',
        customer_code: customerCode,
      })
    }

    const { customer_code, measures } = await sut.execute({
      customer_code: customerCode,
    })

    expect(customer_code).toEqual(customer_code)
    expect(measures).toHaveLength(numberOfMeasuresToCreate)
  })

  it('should be able to filter measures by "WATER"', async () => {
    const numberOfMeasuresToCreate = 2
    const customerCode = 'customer_code'

    for (let i = 1; i <= numberOfMeasuresToCreate; i++) {
      await measuresRepository.createMeasure({
        measure_value: 123,
        measure_datetime: new Date(`2024-0${i}-29T00:00:00.000Z`),
        measure_type: 'WATER',
        image_url: 'image_url',
        customer_code: customerCode,
      })
    }

    await measuresRepository.createMeasure({
      measure_value: 123,
      measure_datetime: new Date(`2024-01-29T00:00:00.000Z`),
      measure_type: 'GAS',
      image_url: 'image_url',
      customer_code: customerCode,
    })

    const { customer_code, measures } = await sut.execute({
      customer_code: customerCode,
      measure_type: 'WATER',
    })

    expect(customer_code).toEqual(customer_code)
    expect(measures).toHaveLength(numberOfMeasuresToCreate)
  })

  it('should not list measures from a nonexistent customer_code', async () => {
    await expect(() =>
      sut.execute({
        customer_code: 'any_code',
      }),
    ).rejects.toBeInstanceOf(MeasuresNotFoundError)
  })
})
