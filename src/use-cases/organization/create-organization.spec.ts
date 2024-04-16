import { beforeEach, describe, it } from 'vitest'

import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'

import { CreateOrganizationUseCase } from './create-organization-use-case'

let organizationRepository: InMemoryOrganizationRepository
let addressRepository: InMemoryAddressRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', async () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    addressRepository = new InMemoryAddressRepository()
    sut = new CreateOrganizationUseCase(
      organizationRepository,
      addressRepository,
    )
  })

  it('should be able to create a new organization', async () => {
    const address = await addressRepository.create({
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      postalCode: '22790710',
      street: 'Alfredo Balthazar da silveira',
    })

    const organization = await sut.execute({
      addressData: address,
      cnpj: '89.656.977/0001-75',
      email: 'organization@email.com',
      name: 'Organization',
      password: '123456',
      whatsapp: '21 999132991',
    })

    console.log(organization)
  })
})
