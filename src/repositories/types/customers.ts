export type Customer = {
  code: string
}

export interface FindCustomerByCodeRequest extends Customer {}

export interface FindCustomerByCodeResponse extends Customer {}

export interface CreateCustomerRequest extends Customer {}

export interface CreateCustomerResponse extends Customer {}
