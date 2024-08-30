export const MEASURE_TYPES = ['WATER', 'GAS'] as const
export type MeasureType = (typeof MEASURE_TYPES)[number]

type BaseCustomerData = {
  customer_code: string
}

export type Measure = {
  measure_uuid: string
  measure_value: number
  measure_datetime: Date
  measure_type: MeasureType
  has_confirmed: boolean
  image_url: string
  customer_code: string
}

export interface FindMeasureByUUIDRequest
  extends Pick<Measure, 'measure_uuid'> {}

export interface FindMeasureByUUIDResponse extends Measure {}

export interface CheckDoubleReportRequest
  extends BaseCustomerData,
    Pick<Measure, 'measure_datetime'> {
  measure_type?: MeasureType
}

export interface CheckDoubleReportResponse
  extends BaseCustomerData,
    Pick<Measure, 'measure_datetime' | 'measure_type'> {}

export interface FindManyMeasuresByCustomerCodeRequest
  extends BaseCustomerData {
  measure_type?: MeasureType
}

export type FindManyMeasuresByCustomerCodeResponse = Pick<
  Measure,
  | 'measure_uuid'
  | 'measure_datetime'
  | 'measure_type'
  | 'has_confirmed'
  | 'image_url'
>[]

export interface CreateMeasureRequest
  extends BaseCustomerData,
    Pick<
      Measure,
      'measure_value' | 'measure_datetime' | 'measure_type' | 'image_url'
    > {}

export interface CreateMeasureResponse
  extends Pick<Measure, 'measure_uuid' | 'measure_value' | 'image_url'> {}

export interface ConfirmMeasureRequest
  extends Pick<Measure, 'measure_uuid' | 'measure_value'> {}
