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
}
