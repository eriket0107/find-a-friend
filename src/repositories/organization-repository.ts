import { Organization } from '@/db/entity/Organization'

export type OrganizationRepository = {
  create(data: Organization): Promise<Organization>
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}
