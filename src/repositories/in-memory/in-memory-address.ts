import { Address } from '@/db/entity/Address'

import { AddressInput, AddressRepository } from '../address-repository'

export class InMemoryAddressRepository implements AddressRepository {
  private dataBase: Address[] = []

  async create(data: AddressInput): Promise<Address> {
    const address = {
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
      latitude: data.latitude,
      longitude: data.longitude,
    }

    this.dataBase.push(address)

    return address
  }
}
