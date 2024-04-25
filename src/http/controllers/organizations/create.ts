import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeOrganization } from '@/use-cases/fatories/make-organizations'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createOrganizationRequestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    cnpj: z.string().length(14, { message: 'must have cnpj correct length' }),
    phone: z
      .string()
      .length(11, { message: 'must have whatsapp correct length' }),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      country: z.string(),
    }),
  })

  const { name, email, password, cnpj, phone, address } =
    createOrganizationRequestSchema.parse(request.body)

  const createOrganizationUseCase = makeOrganization()

  try {
    await createOrganizationUseCase.execute({
      name,
      email,
      password,
      cnpj,
      phone,
      address,
    })

    return reply.status(201).send({ message: 'ok' })
  } catch (e) {
    console.log(e)
  }
}
