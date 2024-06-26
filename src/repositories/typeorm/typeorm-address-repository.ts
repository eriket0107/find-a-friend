import { dataSource } from 'db/data-source'
import { Address } from 'db/entity/Address'
import { Repository } from 'typeorm'

import { AddressRepository } from '../address-repository'

export class TypeOrmAddressRepository implements AddressRepository {
  private repository: Repository<Address> = dataSource.getRepository(Address)

  async create(data: Address): Promise<Address> {
    const address = await this.repository.save(data)
    return address
  }
}
