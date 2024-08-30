import { ConfirmationDuplicate, MeasureNotFoundError } from '@/http/errors'
import type { MeasuresRepository } from '@/repositories'
import type { Measure } from '@/repositories/types'

interface ConfirmMeasureServiceRequest extends Pick<Measure, 'measure_uuid'> {
  confirmed_value: number
}

interface ConfirmMeasureServiceResponse {
  success: boolean
}

export class ConfirmMeasureService {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    measure_uuid,
    confirmed_value,
  }: ConfirmMeasureServiceRequest): Promise<ConfirmMeasureServiceResponse> {
    const measure = await this.measuresRepository.findByUUID({ measure_uuid })

    if (!measure) {
      throw new MeasureNotFoundError()
    }

    if (measure.has_confirmed) {
      throw new ConfirmationDuplicate()
    }

    await this.measuresRepository.confirmMeasure({
      measure_uuid,
      measure_value: confirmed_value,
    })

    return { success: true }
  }
}
