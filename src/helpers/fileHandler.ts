import fs from 'node:fs/promises'
import path from 'node:path'

import { SavedMultipartFile } from '@fastify/multipart'
import sharp from 'sharp'

type File = SavedMultipartFile

export class FileHandler {
  async saveFile({ id, file }: { id: string; file: File }) {
    const uniqueName = `${id}-${file.filename}`.split('.')[0]
    const photoPath = path.join('src/uploads', `${uniqueName}.webp`)

    const dirPath = path.dirname(photoPath)
    await fs.mkdir(dirPath, { recursive: true })

    await fs.rename(file.filepath, photoPath)

    try {
      const input = await fs.readFile(photoPath)
      const resizedImage = await sharp(input)
        .resize({ width: 500, height: 500 })
        .toFormat('webp')
        .toBuffer()

      await fs.writeFile(photoPath, resizedImage)

      console.log(`File moved and resized successfully to ${photoPath}`)

      return {
        photoPath,
        type: 'webp',
        fileSizeInMB: (await fs.stat(photoPath)).size / 1024 / 1024,
      }
    } catch (error) {
      console.error(`Error processing file: ${(error as Error).message}`)
    }
  }

  async readFile(path: string): Promise<Buffer | undefined> {
    try {
      const data = await fs.readFile(path)
      return data
    } catch (error) {
      console.error('Error reading file:', error)
      throw error
    }
  }
}
