import { Pet } from 'db/entity/Pet'

type searcParams = {
  breed?: string
  traits?: string[]
  size?: string
  city?: string
  age?: number
}

export type PetRepository = {
  create(data: Pet): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  list(organizationId: string): Promise<Pet[]>
  search(params: searcParams): Promise<Pet[]>
  insertPhoto(petId: string, photo: string): Promise<void>
}
