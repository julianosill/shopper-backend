import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaMeasuresRepository } from '@/repositories/prisma'
import { ConfirmMeasureService } from '@/services'

const bodySchema = z.object({
  measure_uuid: z
    .string({ message: 'UUID de leitura inválido' })
    .uuid({ message: 'UUID de leitura inválido' }),
  confirmed_value: z.number({ message: 'O valor deve ser um número' }),
})

type BodySchema = z.infer<typeof bodySchema>

export async function confirm(
  request: FastifyRequest<{ Body: BodySchema }>,
  reply: FastifyReply,
) {
  const { measure_uuid, confirmed_value } = bodySchema.parse(request.body)

  const measuresRepository = new PrismaMeasuresRepository()
  const confirmMeasureService = new ConfirmMeasureService(measuresRepository)
  const response = await confirmMeasureService.execute({
    measure_uuid,
    confirmed_value,
  })

  return reply.status(200).send(response)
}
