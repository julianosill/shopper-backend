import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

import sharp from 'sharp'

import { InvalidImageError } from '@/http/errors'

interface ConvertAndSaveImageReturn {
  name: string
  path: string
}

export async function convertAndSaveImage(
  base64Image: string,
): Promise<ConvertAndSaveImageReturn> {
  const base64Data = base64Image.replace(
    /^data:image\/(jpeg|png|gif|bmp|webp);base64,/,
    '',
  )
  const imageBuffer = Buffer.from(base64Data, 'base64')
  const fileName = `${randomUUID()}.jpg`
  const filePath = `tmp/${fileName}`

  fs.writeFileSync(filePath, imageBuffer)

  await sharp(filePath)
    .metadata()
    .catch((err) => {
      console.error('Invalid image file:', err.message)
      fs.unlinkSync(filePath)
      throw new InvalidImageError()
    })

  return { name: fileName, path: filePath }
}
