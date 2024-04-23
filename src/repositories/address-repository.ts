import { Address } from '@/db/entity/Address'
import { Organization } from '@/db/entity/Organization'

export type AddressInput = {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  latitude?: number
  longitude?: number
  organization: Organization
}

export type AddressRepository = {
  create(data: AddressInput): Promise<Address>
}
