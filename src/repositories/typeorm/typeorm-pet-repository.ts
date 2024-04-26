import { dataSource } from 'db/data-source'
import { Pet } from 'db/entity/Pet'
import { ILike, Repository } from 'typeorm'

import { PetRepository } from '../pet-repository'

export class TypeOrmPetRepository implements PetRepository {
  private repository: Repository<Pet> = dataSource.getRepository(Pet)

  async create(data: Pet) {
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

  async search(params: {
    breed?: string
    traits?: string[]
    size?: string
    city?: string
    age?: number
  }): Promise<Pet[]> {
    const searchFilter: any = {}

    if (params.breed) searchFilter.breed = ILike(`%${params.breed}%`)

    if (params.size) searchFilter.size = ILike(`%${params.size}%`)

    if (params.city)
      searchFilter['organization.address.city'] = ILike(`%${params.city}%`)

    if (params.age) searchFilter.age = params.age

    if (params.traits && params.traits.length)
      searchFilter.traits = params.traits.map((trait) => ILike(`%${trait}%`))

    const pets = await this.repository.find({
      where: searchFilter,
    })

    return pets
  }
}
