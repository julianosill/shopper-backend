export type MeasureType = 'WATER' | 'GAS'

export type Measure = {
  measure_uuid: string
  measure_datetime: Date
  measure_type: MeasureType
  has_confirmed: boolean
  image_url: string
}
export interface FindMeasureByUUIDRequest {
  measure_uuid: string
}

export interface FindMeasureByUUIDResponse {
  measure_uuid: string
  measure_value: number
  measure_datetime: Date
  measure_type: MeasureType
  has_confirmed: boolean
  image_url: string
  customer_code: string
}

export interface CheckDoubleReportRequest {
  customer_code: string
  measure_datetime: Date
  measure_type?: MeasureType
}

export interface CheckDoubleReportResponse {
  customer_code: string
  measure_datetime: Date
  measure_type: MeasureType
}
export interface FindManyMeasuresByCustomerCodeRequest {
  customer_code: string
  measure_type?: MeasureType
}

export type FindManyMeasuresByCustomerCodeResponse = Measure[]

export interface CreateMeasureRequest {
  measure_value: number
  measure_datetime: Date
  measure_type: MeasureType
  image_url: string
  customer_code: string
}

export interface CreateMeasureResponse {
  image_url: string
  measure_value: number
  measure_uuid: string
}

export interface ConfirmMeasureRequest {
  measure_uuid: string
  measure_value: number
}
