import { Pet } from '@/db/entity/Pet'

export type PetInput = {
  name: string
  breed: string
  description: string
  age: number
  traits: string[]
  photo: string
  organizationId: string
}

export type PetRepository = {
  create(data: PetInput): Promise<{ pet: Pet }>
}
