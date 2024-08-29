import fs from 'node:fs'

import { ImageNotFoundError } from '@/http/error-classes'

interface GetImageServiceRequest {
  tmpFolder: string
  fileName: string
}

export class GetImageService {
  execute({ tmpFolder, fileName }: GetImageServiceRequest): fs.ReadStream {
    const filePath = `${tmpFolder}/${fileName}`

    if (!fs.existsSync(filePath)) {
      throw new ImageNotFoundError()
    }

    const imageFile = fs.createReadStream(filePath)

    return imageFile
  }
}
