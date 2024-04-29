import fs from 'node:fs'
import path from 'node:path'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const uploadPhoto = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const file = await request.saveRequestFiles()

  const fileMetadataSchema = z.object({
    fieldname: z.string(),
    filename: z.string(),
    mimetype: z.string().regex(/^image\/(jpg|jpeg|png|gif|svg\+xml)$/),
    size: z
      .number()
      .min(1)
      .max(1024 * 1024), // limit the size to 1024 Mb
  })

  try {
    fileMetadataSchema.parse(file)
    const uniqueName = `photo-${Date.now()}-${file?.[0].filename}`
    const newPath = path.join('uploads', uniqueName)

    fs.renameSync(file?.[0].filepath, newPath)

    reply.send({ message: 'File uploaded successfully', file })
  } catch (error) {
    reply.code(400).send({ message: 'Invalid file metadata', error })
  }
}
