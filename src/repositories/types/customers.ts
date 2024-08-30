interface BaseCustomerData {
  code: string
}

export interface FindCustomerByCodeRequest extends BaseCustomerData {}

export interface FindCustomerByCodeResponse extends BaseCustomerData {}

export interface CreateCustomerRequest extends BaseCustomerData {}

export interface CreateCustomerResponse extends BaseCustomerData {}
