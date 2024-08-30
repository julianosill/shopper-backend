export const MEASURE_TYPES = ['WATER', 'GAS'] as const
export type MeasureType = (typeof MEASURE_TYPES)[number]
interface BaseMeasureData {
  measure_uuid: string
}

interface BaseCustomerData {
  customer_code: string
}

export interface Measure extends BaseMeasureData {
  measure_datetime: Date
  measure_type: MeasureType
  has_confirmed: boolean
  image_url: string
}
export interface FindMeasureByUUIDRequest extends BaseMeasureData {}

export interface FindMeasureByUUIDResponse extends BaseMeasureData {
  measure_value: number
  measure_datetime: Date
  measure_type: MeasureType
  has_confirmed: boolean
  image_url: string
  customer_code: string
}

export interface CheckDoubleReportRequest extends BaseCustomerData {
  measure_datetime: Date
  measure_type?: MeasureType
}

export interface CheckDoubleReportResponse extends BaseCustomerData {
  measure_datetime: Date
  measure_type: MeasureType
}
export interface FindManyMeasuresByCustomerCodeRequest
  extends BaseCustomerData {
  measure_type?: MeasureType
}

export interface FindManyMeasuresByCustomerCodeResponse extends Measure {}

export interface CreateMeasureRequest extends BaseCustomerData {
  measure_value: number
  measure_datetime: Date
  measure_type: MeasureType
  image_url: string
}

export interface CreateMeasureResponse extends BaseMeasureData {
  image_url: string
  measure_value: number
}

export interface ConfirmMeasureRequest extends BaseMeasureData {
  measure_value: number
}
