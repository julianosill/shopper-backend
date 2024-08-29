import { prisma } from '@/libs/prisma'

import type { MeasuresRepository } from '..'
import type {
  CheckDoubleReportRequest,
  CheckDoubleReportResponse,
  ConfirmMeasureRequest,
  CreateMeasureRequest,
  CreateMeasureResponse,
  FindManyMeasuresByCustomerCodeRequest,
  FindManyMeasuresByCustomerCodeResponse,
  FindMeasureByUUIDRequest,
  FindMeasureByUUIDResponse,
} from '../types'

export class PrismaMeasuresRepository implements MeasuresRepository {
  async findByUUID({
    measure_uuid,
  }: FindMeasureByUUIDRequest): Promise<FindMeasureByUUIDResponse | null> {
    const measure = await prisma.measure.findUnique({ where: { measure_uuid } })
    return measure
  }

  async checkDoubleReport({
    customer_code,
    measure_datetime,
    measure_type,
  }: CheckDoubleReportRequest): Promise<CheckDoubleReportResponse | null> {
    const measure = await prisma.measure.findFirst({
      where: { customer_code, measure_datetime, measure_type },
      select: {
        customer_code: true,
        measure_datetime: true,
        measure_type: true,
      },
    })
    return measure
  }

  async findManyByCustomerCode({
    customer_code,
    measure_type,
  }: FindManyMeasuresByCustomerCodeRequest): Promise<FindManyMeasuresByCustomerCodeResponse> {
    const measures = await prisma.measure.findMany({
      where: { customer_code, measure_type },
      select: {
        measure_uuid: true,
        measure_datetime: true,
        measure_type: true,
        has_confirmed: true,
        image_url: true,
      },
    })
    return measures
  }

  async createMeasure(
    data: CreateMeasureRequest,
  ): Promise<CreateMeasureResponse> {
    const measure = await prisma.measure.create({
      data,
      select: {
        image_url: true,
        measure_value: true,
        measure_uuid: true,
      },
    })
    return measure
  }

  async confirmMeasure({
    measure_uuid,
    measure_value,
  }: ConfirmMeasureRequest): Promise<void> {
    await prisma.measure.update({
      where: { measure_uuid },
      data: { measure_value, has_confirmed: true },
    })
  }
}
