import { dataSource } from '@/db/data-source'
import { Pet } from '@/db/entity/Pet'

import { PetInput, PetRepository } from '../pet-repository'

export class TypeOrmPetRepository implements PetRepository {
  private repository = dataSource.getRepository(Pet)

  async create(data: PetInput) {
    const pet = await this.repository.save(data)

    return pet
  }
}
