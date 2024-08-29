import { prisma } from '@/libs/prisma'

import type { CustomersRepository } from '..'
import type {
  CreateCustomerRequest,
  CreateCustomerResponse,
  FindCustomerByCodeRequest,
  FindCustomerByCodeResponse,
} from '../types'

export class PrismaCustomersRepository implements CustomersRepository {
  async findByCode({
    code,
  }: FindCustomerByCodeRequest): Promise<FindCustomerByCodeResponse | null> {
    const user = await prisma.customer.findUnique({ where: { code } })
    return user
  }

  async create(data: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    const user = await prisma.customer.create({ data })
    return user
  }
}
