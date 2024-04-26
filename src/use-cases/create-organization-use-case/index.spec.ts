import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { makeOrganization } from '@/tests/makeOrg'

import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { CreateOrganizationUseCase } from '.'

let organizationRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', async () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await sut.execute(makeOrganization())

    expect(organization.name).toEqual(expect.any(String))
    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new org with an already used email', async () => {
    const { organization } = await sut.execute(makeOrganization())

    await expect(sut.execute(organization)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })

  it('should hash password upon creation', async () => {
    const password = '123456'

    const fakeOrg = makeOrganization({ password })

    const { organization } = await sut.execute(fakeOrg)

    expect(await compare(password, organization.password)).toBe(true)
  })
})
