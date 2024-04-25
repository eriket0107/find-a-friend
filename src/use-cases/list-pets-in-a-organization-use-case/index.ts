import { Pet } from '@/db/entity/Pet'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { PetRepository } from '@/repositories/pet-repository'

import { OrgNotFoundError } from '../errors/org-not-found-error'

type ListPetsInAOrganizationUseCaseRequest = {
  organizationId: string
}

type ListPetsInAOrganizationUseCaseResponse = {
  pets: Pet[]
}

export class ListPetsInAOrganizationUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private petRepository: PetRepository,
  ) {}

  async execute({
    organizationId,
  }: ListPetsInAOrganizationUseCaseRequest): Promise<ListPetsInAOrganizationUseCaseResponse> {
    const organization =
      await this.organizationRepository.findById(organizationId)

    if (!organization) throw new OrgNotFoundError()

    const pets = await this.petRepository.list(organization.id as string)

    return { pets }
  }
}
