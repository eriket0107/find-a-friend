import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'

import { PetNotFoundError } from '../errors/pet-not-found-error'
import { GetAPetuseCae } from '.'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: GetAPetuseCae

describe('Register Pet Use Case', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new GetAPetuseCae(petRepository)
  })

  it('shuld be able to get current pet', async () => {
    const address = {
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      zipCode: '22790710',
      street: 'Alfredo Balthazar da silveira',
    }

    const organization = await organizationRepository.create({
      address,
      id: randomUUID(),
      cnpj: '89656977000175',
      email: 'organization@email.com',
      name: 'Organization',
      password: '123456',
      phone: '21999132991',
    })

    const petToGet = await petRepository.create({
      age: 4,
      breed: 'Golden Retriver',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Dog',
      photo: 'teste.png',
      traits: ['Brincalhão', 'Fofo'],
      size: 'giant',
      organization,
    })

    const { pet } = await sut.execute({ petId: petToGet.id })

    expect(pet.name).toEqual('Dog')
    expect(pet).toEqual(expect.objectContaining(pet))
    expect(pet.organization).toEqual(expect.objectContaining(organization))
  })

  it('should not be possible to find a pet', async () => {
    await expect(
      sut.execute({
        petId: '1',
      }),
    ).rejects.to.toBeInstanceOf(PetNotFoundError)
  })
})
