import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makePet } from '@/use-cases/fatories/make-pets'

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

  const registerPetsUseCase = makePet()

  try {
    const { pet } = await registerPetsUseCase.execute({
      organizationId,
      age,
      breed,
      description,
      name,
      traits,
      photo,
    })

    console.log(pet.organization)

    return reply.status(201).send({ message: 'ok' })
  } catch (err) {
    console.error(err)
  }
}
