import type {
  ConfirmMeasureRequest,
  CreateMeasureRequest,
  CreateMeasureResponse,
  FindByCustomerMeasureTypeAndMonthRequest,
  FindByCustomerMeasureTypeAndMonthResponse,
  FindManyMeasuresByCustomerCodeRequest,
  FindManyMeasuresByCustomerCodeResponse,
  FindMeasureByUUIDRequest,
  Measure,
} from './types'

export interface MeasuresRepository {
  findByUUID(data: FindMeasureByUUIDRequest): Promise<Measure | null>
  findByCustomerMeasureTypeAndMonth(
    data: FindByCustomerMeasureTypeAndMonthRequest,
  ): Promise<FindByCustomerMeasureTypeAndMonthResponse | null>
  findManyByCustomerCode(
    data: FindManyMeasuresByCustomerCodeRequest,
  ): Promise<FindManyMeasuresByCustomerCodeResponse>
  createMeasure(data: CreateMeasureRequest): Promise<CreateMeasureResponse>
  confirmMeasure(data: ConfirmMeasureRequest): Promise<void>
}
