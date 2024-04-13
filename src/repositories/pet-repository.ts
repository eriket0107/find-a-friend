import { Pet } from '@/db/entity/Pet'

type PetInput = Partial<
  Omit<Pet, 'created_at' | 'id' | 'updated_at' | 'organization'>
>

export type PetRepository = {
  create(data: PetInput): Promise<{ pet: Pet }>
}
