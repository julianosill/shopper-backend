import { DoubleReportError } from '@/http/errors'
import { InMemoryMeasuresRepository } from '@/repositories/in-memory'
import { validBase64Image } from '@/tests/mocks'

import {
  CreateMeasureService,
  type CreateMeasureServiceRequest,
} from './create-measure-service'

let measuresRepository: InMemoryMeasuresRepository
let sut: CreateMeasureService

describe('Create Measure Service', () => {
  beforeAll(async () => {
    measuresRepository = new InMemoryMeasuresRepository()
    sut = new CreateMeasureService(measuresRepository)
  })

  beforeEach(async () => {
    measuresRepository.items = []
  })

  it('should not be able to upload a measure within the same month', async () => {
    const measure = {
      image: validBase64Image,
      baseImageURL: '/',
      customer_code: 'customer_code',
      measure_datetime: new Date('2024-08-30T03:00:00.000Z'),
      measure_type: 'WATER',
    } satisfies CreateMeasureServiceRequest

    await measuresRepository.createMeasure({
      customer_code: 'customer_code',
      image_url: 'image_url',
      measure_datetime: new Date('2024-08-15T03:00:00.000Z'),
      measure_type: 'WATER',
      measure_value: 50,
    })

    await expect(() => sut.execute(measure)).rejects.toBeInstanceOf(
      DoubleReportError,
    )
  })
})
