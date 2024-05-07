import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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

  try {
    for await (const file of files) {
      fileMetadataSchema.parse(file)
      const uniqueName = `${randomUUID()}-photo-${file?.filename}`
      const newPath = path.join('src/uploads', uniqueName)

      const dirPath = path.dirname(newPath)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }

      fs.renameSync(file?.filepath, newPath)
    }
  } catch (error) {
    console.log({ error })
    reply.code(400).send({ message: 'Invalid file metadata', error })
  }

  reply.send({ message: 'File uploaded successfully' })
}
