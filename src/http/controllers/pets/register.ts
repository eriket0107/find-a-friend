import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { TypeOrmPetRepository } from '@/repositories/typeorm/typeorm-pet-repository'
import { RegisterPetsUseCase } from '@/use-cases/pets/register-use-case'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    breed: z.string(),
    description: z.string(),
    age: z.number(),
    traits: z.array(z.string()),
    photo: z.string(),
    organizationId: z.string(),
  })
  const { age, breed, description, name, traits, photo, organizationId } =
    registerBodySchema.parse(request.body)

  const PetRepository = new TypeOrmPetRepository()
  const registerPetsUseCase = new RegisterPetsUseCase(PetRepository)
  try {
    await registerPetsUseCase.execute({
      organizationId,
      age,
      breed,
      description,
      name,
      traits,
      photo,
    })

    return reply.status(201).send({ message: 'ok' })
  } catch (err) {
    console.error(err)
  }
}
