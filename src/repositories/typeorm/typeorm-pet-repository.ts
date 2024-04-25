import { Repository } from 'typeorm'

import { dataSource } from '@/db/data-source'
import { Pet } from '@/db/entity/Pet'

import { PetInput, PetRepository } from '../pet-repository'

export class TypeOrmPetRepository implements PetRepository {
  private repository: Repository<Pet> = dataSource.getRepository(Pet)

  async create(data: PetInput) {
    const pet = await this.repository.save(data)

    return pet
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = await this.repository.findOne({ where: { id: petId } })

    return pet
  }

  async list(organizationId: string): Promise<Pet[]> {
    const pets = await this.repository.find({ where: { id: organizationId } })

    return pets
  }
}
