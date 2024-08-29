import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { GetImageService } from '@/services'

const paramSchema = z.object({
  filename: z.string({ message: 'Imagem não informada' }),
})

type ParamSchema = z.infer<typeof paramSchema>

export async function images(
  request: FastifyRequest<{ Params: ParamSchema }>,
  reply: FastifyReply,
) {
  const { filename: fileName } = paramSchema.parse(request.params)
  const getImageService = new GetImageService()
  const image = getImageService.execute({
    tmpFolder: 'tmp',
    fileName,
  })

  return reply.type('image/jpeg').send(image)
}
