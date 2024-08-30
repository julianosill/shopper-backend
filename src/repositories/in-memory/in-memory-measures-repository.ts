import { randomUUID } from 'node:crypto'

import type { MeasuresRepository } from '..'
import type {
  ConfirmMeasureRequest,
  CreateMeasureRequest,
  CreateMeasureResponse,
  FindByCustomerMeasureTypeAndMonthRequest,
  FindByCustomerMeasureTypeAndMonthResponse,
  FindManyMeasuresByCustomerCodeRequest,
  FindManyMeasuresByCustomerCodeResponse,
  FindMeasureByUUIDRequest,
  FindMeasureByUUIDResponse,
  Measure,
} from '../types'

export class InMemoryMeasuresRepository implements MeasuresRepository {
  public items: Measure[] = []

  async findByUUID({
    measure_uuid,
  }: FindMeasureByUUIDRequest): Promise<FindMeasureByUUIDResponse | null> {
    const measure = this.items.find(
      (item) => item.measure_uuid === measure_uuid,
    )
    if (!measure) return null
    return measure
  }

  async findByCustomerMeasureTypeAndMonth({
    customer_code,
    measure_type,
    startOfMonth,
    endOfMonth,
  }: FindByCustomerMeasureTypeAndMonthRequest): Promise<FindByCustomerMeasureTypeAndMonthResponse | null> {
    const measure = this.items.find((item) => {
      const startDate = new Date(startOfMonth)
      const endDate = new Date(endOfMonth)
      const measureDate = new Date(item.measure_datetime)
      const sameMonth = measureDate >= startDate && measureDate <= endDate

      return (
        sameMonth &&
        item.customer_code === customer_code &&
        item.measure_type === measure_type
      )
    })

    if (!measure) {
      return null
    }

    return {
      customer_code: measure.customer_code,
      measure_datetime: measure.measure_datetime,
      measure_type: measure.measure_type,
    }
  }

  async findManyByCustomerCode({
    customer_code,
    measure_type,
  }: FindManyMeasuresByCustomerCodeRequest): Promise<FindManyMeasuresByCustomerCodeResponse> {
    const measures = this.items
      .filter((item) => {
        if (measure_type) {
          return (
            item.customer_code === customer_code &&
            item.measure_type.toUpperCase().includes(measure_type.toUpperCase())
          )
        }
        return item.customer_code === customer_code
      })
      .map((item) => {
        return {
          measure_uuid: item.measure_uuid,
          measure_datetime: item.measure_datetime,
          measure_type: item.measure_type,
          has_confirmed: item.has_confirmed,
          image_url: item.image_url,
        }
      })

    return measures
  }

  async createMeasure(
    data: CreateMeasureRequest,
  ): Promise<CreateMeasureResponse> {
    const measure = {
      ...data,
      measure_uuid: randomUUID(),
      has_confirmed: false,
    }
    this.items.push(measure)

    return {
      image_url: measure.image_url,
      measure_value: measure.measure_value,
      measure_uuid: measure.measure_uuid,
    }
  }

  async confirmMeasure({
    measure_uuid,
    measure_value,
  }: ConfirmMeasureRequest): Promise<void> {
    const measureIndex = this.items.findIndex(
      (item) => item.measure_uuid === measure_uuid,
    )

    if (measureIndex >= 0) {
      this.items[measureIndex] = {
        ...this.items[measureIndex],
        measure_value,
        has_confirmed: true,
      }
    }
  }
}
