import type { CustomersRepository } from '..'
import type {
  CreateCustomerRequest,
  CreateCustomerResponse,
  Customer,
  FindCustomerByCodeRequest,
  FindCustomerByCodeResponse,
} from '../types'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async findByCode({
    code,
  }: FindCustomerByCodeRequest): Promise<FindCustomerByCodeResponse | null> {
    const user = this.items.find((item) => item.code === code)
    if (!user) return null
    return user
  }

  async create(data: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    this.items.push(data)
    return data
  }
}
