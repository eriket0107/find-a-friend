import { Organization } from '@/db/entity/Organization'
import { Pet } from '@/db/entity/Pet'

export type PetInput = {
  name: string
  breed: string
  description: string
  age: number
  traits: string[]
  photo: string
  organization?: Organization
}

export type PetRepository = {
  create(data: PetInput): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  list(organizationId: string): Promise<Pet[]>
}
