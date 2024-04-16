import { Address } from '@/db/entity/Address'

export type AddressInput = {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  latitude?: number
  longitude?: number
}

export type AddressRepository = {
  create(data: AddressInput): Promise<Address>
}
