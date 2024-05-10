import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PhotoHandler } from '@/helpers/photoHandler'
import { TypeOrmPetRepository } from '@/repositories/typeorm/typeorm-pet-repository'
import { UploadPetPhotoUseCase } from '@/use-cases/upload-pet-photo-use-case'
import { errorHandler } from '@/utils/errorHandler'

export const uploadPhoto = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const files = await request.saveRequestFiles()

  const fileMetadataSchema = z.object({
    fieldname: z.string(),
    filename: z.string(),
    mimetype: z.string().regex(/^image\/(jpg|jpeg|png|webp)$/),
  })

  const paramsPetIdSchema = z.object({
    petId: z.string(),
  })

  const { petId } = paramsPetIdSchema.parse(request.params)

  const petRepository = new TypeOrmPetRepository()
  const uploadphotoUseCase = new UploadPetPhotoUseCase(petRepository)
  const photoHandler = new PhotoHandler()

  let photo
  try {
    for await (const fileChunk of files) {
      fileMetadataSchema.parse(fileChunk)

      photo = await photoHandler.handleFile({ file: fileChunk, petId })
    }

    if (!photo) throw new Error("Can't upload photo")

    await uploadphotoUseCase.execute({
      photo: photo.newPath,
      size: photo.fileSizeInMB,
      petId,
      type: photo.type,
    })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }

  reply.send({ message: 'File uploaded successfully' })
}
