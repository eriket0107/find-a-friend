import fs from 'node:fs/promises'

export const readFileToBuffer = async (
  photoPath: string,
): Promise<Buffer | undefined> => {
  try {
    const data = await fs.readFile(photoPath)
    return data
  } catch (error) {
    console.error('Error reading file:', error)
    return undefined
  }
}
