import { convertAndSaveImage, extractDataFromImage } from '@/helpers'
import { DoubleReportError } from '@/http/errors'
import type { MeasuresRepository } from '@/repositories'
import type { Measure } from '@/repositories/types'

export interface CreateMeasureServiceRequest
  extends Pick<Measure, 'customer_code' | 'measure_datetime' | 'measure_type'> {
  image: string
  baseImageURL: string
}

interface CreateMeasureServiceResponse
  extends Pick<Measure, 'image_url' | 'measure_value' | 'measure_uuid'> {}

export class CreateMeasureService {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    image,
    baseImageURL,
    customer_code,
    measure_datetime,
    measure_type,
  }: CreateMeasureServiceRequest): Promise<CreateMeasureServiceResponse> {
    const measureDate = new Date(measure_datetime)
    const year = measureDate.getFullYear()
    const monthNumber = measureDate.getMonth()
    const startOfMonth = new Date(year, monthNumber, 1)
    const endOfMonth = new Date(year, monthNumber + 1, 0)

    const doubleReport =
      await this.measuresRepository.findByCustomerMeasureTypeAndMonth({
        customer_code,
        measure_type,
        startOfMonth,
        endOfMonth,
      })

    if (doubleReport) {
      throw new DoubleReportError()
    }

    const imageFile = convertAndSaveImage(image)
    const imageUrl = `${baseImageURL}/${imageFile.name}`

    const { measureValue } = await extractDataFromImage(imageFile.path)

    const measure = await this.measuresRepository.createMeasure({
      measure_value: measureValue,
      measure_datetime,
      measure_type,
      image_url: imageUrl,
      customer_code,
    })

    return measure
  }
}
