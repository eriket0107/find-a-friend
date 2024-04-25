import { Pet } from '@/db/entity/Pet'

export type PetRepository = {
  create(data: Pet): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  list(organizationId: string): Promise<Pet[]>
}
