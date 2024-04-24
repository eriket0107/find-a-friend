import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'

import { OrgAlreadyExistsError } from '../errors/org-already-exists'
import { CreateOrganizationUseCase } from '.'

let organizationRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', async () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able to create a new organization', async () => {
    const address = {
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      zipCode: '22790-710',
      street: 'Alfredo Balthazar da silveira',
    }

    const { organization } = await sut.execute({
      address,
      cnpj: '89656977000175',
      email: 'organization@email.com',
      name: 'Organization',
      password: '123456',
      whatsapp: '21999132991',
    })

    expect(organization.name).toEqual(expect.any(String))
    expect(organization.address).toEqual(address)
  })

  it('should not be able to create a new org with an already used email', async () => {
    const address = {
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      zipCode: '22790-710',
      street: 'Alfredo Balthazar da silveira',
    }

    await sut.execute({
      address,
      cnpj: '89.656.977/0001-75',
      email: 'organization@email.com',
      name: 'Organization',
      password: '123456',
      whatsapp: '21 999132991',
    })

    await expect(
      sut.execute({
        address,
        cnpj: '89.656.977/0001-75',
        email: 'organization@email.com',
        name: 'Organization',
        password: '123456',
        whatsapp: '21 999132991',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should hash password upon creation', async () => {
    const password = '123456'

    const address = {
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      zipCode: '22790-710',
      street: 'Alfredo Balthazar da silveira',
    }

    const { organization } = await sut.execute({
      address,
      cnpj: '89.656.977/0001-75',
      email: 'organization@email.com',
      name: 'Organization',
      password,
      whatsapp: '21 999132991',
    })

    expect(await compare(password, organization.password)).toBe(true)
  })
})
