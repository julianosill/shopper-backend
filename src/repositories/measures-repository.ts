import type {
  CheckDoubleReportRequest,
  CheckDoubleReportResponse,
  ConfirmMeasureRequest,
  CreateMeasureRequest,
  CreateMeasureResponse,
  FindManyMeasuresByCustomerCodeRequest,
  FindManyMeasuresByCustomerCodeResponse,
  FindMeasureByUUIDRequest,
  Measure,
} from './types'

export interface MeasuresRepository {
  findByUUID(data: FindMeasureByUUIDRequest): Promise<Measure | null>
  checkDoubleReport(
    data: CheckDoubleReportRequest,
  ): Promise<CheckDoubleReportResponse | null>
  findManyByCustomerCode(
    data: FindManyMeasuresByCustomerCodeRequest,
  ): Promise<FindManyMeasuresByCustomerCodeResponse>
  createMeasure(data: CreateMeasureRequest): Promise<CreateMeasureResponse>
  confirmMeasure(data: ConfirmMeasureRequest): Promise<void>
}
