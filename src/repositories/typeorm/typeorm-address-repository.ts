import { dataSource } from '@/db/data-source'
import { Address } from '@/db/entity/Address'

import { AddressRepository } from '../address-repository'

export class TypeOrmAdressRepository implements AddressRepository {
  async create(data: Address): Promise<Address> {
    const address = await dataSource.getMongoRepository(Address).save(data)

    return address
  }
}
