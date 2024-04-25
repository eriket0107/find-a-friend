import { randomUUID } from 'node:crypto'

import { Pet } from '@/db/entity/Pet'

import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  private dataBase: Pet[] = []

  async create(data: Pet) {
    const pet = {
      id: randomUUID(),
      ...data,
    }

    this.dataBase.push(pet)

    return pet
  }

  async findById(petId: string): Promise<Pet | null> {
    return this.dataBase.find((pet) => pet.id === petId) ?? null
  }

  async list(organizationId: string): Promise<Pet[]> {
    return this.dataBase.filter(
      (data) => data.organization?.id === organizationId,
    )
  }

  async search(params: {
    breed?: string
    traits?: string[]
    size?: string
    city?: string
    age?: number
  }): Promise<Pet[]> {
    const pets = this.dataBase
      .filter((pet) =>
        params.city
          ? pet.organization?.address.city.toLowerCase() ===
            params.city.toLowerCase()
          : true,
      )
      .filter((pet) =>
        params.size
          ? pet.size.toLowerCase() === params.size.toLowerCase()
          : true,
      )
      .filter((pet) => (params.age ? pet.age === params.age : true))
      .filter((pet) =>
        params.breed
          ? pet.breed.toLowerCase() === params.breed.toLowerCase()
          : true,
      )
      .filter((pet) =>
        params.traits
          ? pet.traits.some((trait) =>
              params
                .traits!.map((t) => t.toLowerCase())
                .includes(trait.toLowerCase()),
            )
          : true,
      )

    return pets
  }
}
