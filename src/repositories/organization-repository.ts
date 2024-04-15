import { Organization } from '@/db/entity/Organization'

type OrganizationInput = Organization

export type OrganizationRepository = {
  create(data: OrganizationInput): Promise<Organization>
}
