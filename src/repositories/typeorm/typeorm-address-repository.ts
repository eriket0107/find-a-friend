import { dataSource } from '@/db/data-source'
import { Address } from '@/db/entity/Address'

import { AddressRepository } from '../address-repository'

export class TypeOrmAdressRepository implements AddressRepository {
  private repository = dataSource.getRepository(Address)

  async create(data: Address): Promise<Address> {
    const address = await this.repository.save(data)

    return address
  }
}
