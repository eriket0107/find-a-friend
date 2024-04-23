import { Address } from '@/db/entity/Address'

export type AddressInput = {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  latitude?: number
  longitude?: number
  organizationId?: string
}

export type AddressRepository = {
  create(data: AddressInput): Promise<Address>
}
