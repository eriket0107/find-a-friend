import { Pet } from '@/db/entity/Pet'

import { PetInput, PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  private dataBase: Pet[] = []

  async create(data: PetInput) {
    // TODO: organization call

    const pet = {
      name: data.name,
      breed: data.breed,
      description: data.description,
      age: data.age,
      traits: data.traits,
      photo: data.photo,
      // TODO: organization call
      // organization: 'teste',
    }

    this.dataBase.push(pet)

    return { pet }
  }
}
