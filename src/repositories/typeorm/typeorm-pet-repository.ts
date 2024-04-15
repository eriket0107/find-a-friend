import { dataSource } from '@/db/data-source'
import { Pet } from '@/db/entity/Pet'

import { PetInput, PetRepository } from '../pet-repository'

export class TypeOrmPetRepository implements PetRepository {
  async create(data: PetInput) {
    const pet = await dataSource.getRepository(Pet).save(data)

    return pet
  }
}
