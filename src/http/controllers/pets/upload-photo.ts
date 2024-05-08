import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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

  const paramsSchema = z.object({
    petId: z.string(),
  })
  const { petId } = paramsSchema.parse(request.params)

  const petRepository = new TypeOrmPetRepository()
  const uploadphotoUseCase = new UploadPetPhotoUseCase(petRepository)

  try {
    for await (const file of files) {
      fileMetadataSchema.parse(file)

      const uniqueName = `${randomUUID()}-photo-${file?.filename}`
      const newPath = path.join('src/uploads', uniqueName)

      const dirPath = path.dirname(newPath)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }

      const stats = fs.statSync(file?.filepath)
      const fileSizeInBytes = stats.size

      const fileSizeInKB = fileSizeInBytes / 1024
      const fileSizeInMB = fileSizeInKB / 1024

      fs.renameSync(file?.filepath, newPath)

      await uploadphotoUseCase.execute({
        photo: newPath,
        size: fileSizeInMB,
        petId,
      })
    }
  } catch (error) {
    errorHandler({ error, reply, code: 400 })
  }

  reply.send({ message: 'File uploaded successfully' })
}
