import { randomUUID } from 'node:crypto'

import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'

import { SearchPetsUseCase } from '.'

let petRepository: InMemoryPetRepository
let sut: SearchPetsUseCase

let organizationRepository: InMemoryOrganizationRepository

describe('Search Pets Use Case', async () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository()
    sut = new SearchPetsUseCase(petRepository)
  })

  it('should be able to search for a pet by params', async () => {
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

    await petRepository.create({
      age: 4,
      breed: 'Golden Retriver',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Dog',
      photo: 'teste.png',
      traits: ['Brincalhão', 'Fofo'],
      size: 'big',
      organization,
    })

    await petRepository.create({
      age: 4,
      breed: 'Cocker Spaniel',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Dog',
      photo: 'teste.png',
      traits: ['Travesso', 'Atrevido'],
      size: 'medium',
      organization,
    })

    const { pets } = await sut.execute({
      traits: ['fofo', 'travesso'],
      age: 4,
      city: 'rio de janeiro',
    })

    expect(pets).toHaveLength(2)
  })
  it('should return empty search', async () => {
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

    await petRepository.create({
      age: 4,
      breed: 'Cocker Spaniel',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Dog',
      photo: 'teste.png',
      traits: ['Travesso', 'Atrevido'],
      size: 'medium',
      organization,
    })

    const { pets } = await sut.execute({
      age: 1,
      city: 'são paulo',
      size: 'big',
    })

    expect(pets).toHaveLength(0)
  })
  it('should be able to search by traits', async () => {
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

    await petRepository.create({
      age: 4,
      breed: 'Cocker Spaniel',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Dog',
      photo: 'teste.png',
      traits: ['Travesso', 'Atrevido'],
      size: 'medium',
      organization,
    })

    const { pets } = await sut.execute({
      traits: ['Travesso'],
    })
    console.log(pets)

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toEqual('Dog')
  })
})
