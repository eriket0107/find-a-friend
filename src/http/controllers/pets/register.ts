import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makePet } from '@/use-cases/fatories/make-pets'
import { errorHandler } from '@/utils/errorHandler'

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
    size: z.enum(['small', 'medium', 'big', 'giant']),
  })
  const { age, breed, description, name, traits, photo, organizationId, size } =
    registerBodySchema.parse(request.body)

  const registerPetsUseCase = makePet()

  try {
    await registerPetsUseCase.execute({
      organizationId,
      age,
      breed,
      description,
      name,
      traits,
      photo,
      size,
    })

    return reply.status(201).send({ message: 'ok' })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
