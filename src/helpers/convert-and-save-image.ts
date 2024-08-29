import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

interface ConvertAndSaveImageReturn {
  name: string
  path: string
}

export function convertAndSaveImage(
  base64Image: string,
): ConvertAndSaveImageReturn {
  const base64Data = base64Image.replace(
    /^data:image\/(jpeg|png|gif|bmp|webp);base64,/,
    '',
  )
  const imageBuffer = Buffer.from(base64Data, 'base64')
  const fileName = `${randomUUID()}.jpg`
  const filePath = `tmp/${fileName}`

  fs.writeFileSync(filePath, imageBuffer)

  return { name: fileName, path: filePath }
}
