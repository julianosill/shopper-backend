import { convertAndSaveImage, extractDataFromImage } from '@/helpers'
import { DoubleReportError } from '@/http/errors'
import type { MeasuresRepository } from '@/repositories'
import type { MeasureType } from '@/repositories/types'

interface CreateMeasureServiceRequest {
  image: string
  baseImageURL: string
  customer_code: string
  measure_datetime: Date
  measure_type: MeasureType
}

interface CreateMeasureServiceResponse {
  image_url: string
  measure_value: number
  measure_uuid: string
}

export class CreateMeasureService {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    image,
    baseImageURL,
    customer_code,
    measure_datetime,
    measure_type,
  }: CreateMeasureServiceRequest): Promise<CreateMeasureServiceResponse> {
    const doubleReport = await this.measuresRepository.checkDoubleReport({
      customer_code,
      measure_datetime,
      measure_type,
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
