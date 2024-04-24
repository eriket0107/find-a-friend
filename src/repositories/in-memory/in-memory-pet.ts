import { Pet } from '@/db/entity/Pet'

import { PetInput, PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  private dataBase: Pet[] = []

  async create(data: PetInput) {
    const pet = {
      name: data.name,
      breed: data.breed,
      description: data.description,
      age: data.age,
      traits: data.traits,
      photo: data.photo,
      organization: data.organization,
    }

    this.dataBase.push(pet)

    return pet
  }
}
