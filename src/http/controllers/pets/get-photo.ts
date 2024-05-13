import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FileHandler } from '@/helpers/fileHandler'
import { TypeOrmPetRepository } from '@/repositories/typeorm/typeorm-pet-repository'
import { GetPetPhotoUseCase } from '@/use-cases/get-pet-photo-use-case'
import { errorHandler } from '@/utils/errorHandler'

export const getPhoto = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const paramsPetIdSchema = z.object({
    petId: z.string(),
  })

  const { petId } = paramsPetIdSchema.parse(request.params)

  const petRepository = new TypeOrmPetRepository()
  const getPetPhotoUseCase = new GetPetPhotoUseCase(petRepository)
  const fileHandler = new FileHandler()

  try {
    const { photo, type } = await getPetPhotoUseCase.execute({ petId })

    const photoFile = await fileHandler.readFile(photo)

    return reply.status(200).type(type).send(photoFile)
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }
}
