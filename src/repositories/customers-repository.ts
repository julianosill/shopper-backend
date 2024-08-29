import type {
  CreateCustomerRequest,
  CreateCustomerResponse,
  FindCustomerByCodeRequest,
  FindCustomerByCodeResponse,
} from './types'

export interface CustomersRepository {
  findByCode(
    data: FindCustomerByCodeRequest,
  ): Promise<FindCustomerByCodeResponse | null>
  create(data: CreateCustomerRequest): Promise<CreateCustomerResponse>
}
