import fs from 'node:fs'
import path from 'node:path'

import { SavedMultipartFile } from '@fastify/multipart'
import sharp from 'sharp'

type File = SavedMultipartFile

export class PhotoHandler {
  async handleFile({ petId, file }: { petId: string; file: File }) {
    const uniqueName = `${petId}-${file.filename}`.split('.')[0]
    const photoPath = path.join('src/uploads', uniqueName + '.webp')

    const dirPath = path.dirname(photoPath)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    fs.renameSync(file.filepath, photoPath)

    const input = fs.readFileSync(photoPath)

    const stats = fs.statSync(photoPath)
    const fileSizeInBytes = stats.size

    const fileSizeInKB = fileSizeInBytes / 1024
    const fileSizeInMB = fileSizeInKB / 1024

    try {
      await sharp(input)
        .toFormat('webp')
        .resize({ width: 500, height: 500 })
        .toFile(photoPath)

      console.log(`File moved successfully to ${photoPath}`)

      return {
        photoPath,
        type: 'webp',
        fileSizeInMB,
      }
    } catch (error) {
      console.error(`Error moving file: ${(error as Error).message}`)
    }
  }
}
