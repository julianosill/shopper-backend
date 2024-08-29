import fs from 'node:fs'

import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ImageNotFoundError } from '@/http/error-classes'

export async function images(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    filename: z.string({ message: 'Imagem não informada' }),
  })

  const { filename } = paramSchema.parse(request.params)
  const filePath = `tmp/${filename}`

  if (!fs.existsSync(filePath)) {
    throw new ImageNotFoundError()
  }

  return reply.type('image/jpeg').send(fs.createReadStream(filePath))
}
