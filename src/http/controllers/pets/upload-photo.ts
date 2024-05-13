import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FileHandler } from '@/helpers/fileHandler'
import { TypeOrmPetRepository } from '@/repositories/typeorm/typeorm-pet-repository'
import { PhotoUploadError } from '@/use-cases/errors/photo-upload-error'
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
  const fileHandler = new FileHandler()

  let photo
  try {
    for await (const fileChunk of files) {
      fileMetadataSchema.parse(fileChunk)
      try {
        photo = await fileHandler.saveFile({ file: fileChunk, id: petId })
      } catch (error) {
        console.log(error)
      }
    }

    if (!photo) throw new PhotoUploadError()

    await uploadphotoUseCase.execute({
      petId,
      photo: photo.photoPath,
      size: photo.fileSizeInMB,
      type: photo.type,
    })
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }

  reply.send({ message: 'File uploaded successfully' })
}
