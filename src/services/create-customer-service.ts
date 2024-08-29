import type { Customer } from '@prisma/client'

import type { CustomersRepository } from '@/repositories'

interface CreateCustomerServiceRequest {
  code: string
}

interface CreateCustomerServiceResponse {
  customer: Customer
}

export class CreateCustomerService {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    code,
  }: CreateCustomerServiceRequest): Promise<CreateCustomerServiceResponse> {
    const alreadyRegistered = await this.customersRepository.findByCode({
      code,
    })

    if (alreadyRegistered) {
      return { customer: alreadyRegistered }
    }

    const customer = await this.customersRepository.create({
      code,
    })

    return { customer }
  }
}
