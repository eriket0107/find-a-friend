import { dataSource } from '@/db/data-source'
import { Pet } from '@/db/entity/Pet'

import { PetRepository } from '../pet-repository'

export class TypeOrmPetRepository implements PetRepository {
  async create(data: Pet) {
    const pet = await dataSource.getRepository(Pet).save(data)

    return {
      pet,
    }
  }
}
