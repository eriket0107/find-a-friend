import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeOrganization } from '@/use-cases/fatories/make-organizations'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createOrganizationRequestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    cnpj: z.string().length(14, { message: 'must have cnpj correct length' }),
    whatsapp: z
      .string()
      .length(11, { message: 'must have whatsapp correct length' }),
    addressData: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string(),
    }),
  })

  const { name, email, password, cnpj, whatsapp, addressData } =
    createOrganizationRequestSchema.parse(request.body)

  const createOrganizationUseCase = makeOrganization()

  try {
    await createOrganizationUseCase.execute({
      name,
      email,
      password,
      cnpj,
      whatsapp,
      addressData,
    })

    return reply.status(201).send({ message: 'ok' })
  } catch (e) {
    console.log(e)
  }
}
