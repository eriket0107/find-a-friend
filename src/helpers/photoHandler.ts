import fs from 'node:fs'
import path from 'node:path'

import { SavedMultipartFile } from '@fastify/multipart'

type File = SavedMultipartFile

export class PhotoHandler {
  async handleFile({ petId, file }: { petId: string; file: File }) {
    const type = file.mimetype.split('image/')[1]
    const uniqueName = `${petId}-${file.filename}`
    const newPath = path.join('src/uploads', uniqueName)

    const dirPath = path.dirname(newPath)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    const stats = fs.statSync(file.filepath)
    console.log(stats)
    const fileSizeInBytes = stats.size

    const fileSizeInKB = fileSizeInBytes / 1024
    const fileSizeInMB = fileSizeInKB / 1024

    try {
      fs.renameSync(file.filepath, newPath)
      console.log(`File ${file.filename} moved successfully to ${newPath}`)

      return {
        newPath,
        type,
        fileSizeInMB,
      }
    } catch (error) {
      console.error(`Error moving file: ${(error as Error).message}`)
    }
  }
}
