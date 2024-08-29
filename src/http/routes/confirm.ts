import type { FastifyReply, FastifyRequest } from 'fastify'
import { ConfirmationDuplicate, MeasureNotFoundError } from 'http/error-classes'
import { prisma } from 'libs/prisma'
import { z } from 'zod'

const bodySchema = z.object({
  measure_uuid: z.string().uuid({ message: 'UUID de leitura inválido' }),
  confirmed_value: z.number({ message: 'O valor deve ser um número' }),
})

type BodySchema = z.infer<typeof bodySchema>

export async function confirm(
  request: FastifyRequest<{ Body: BodySchema }>,
  reply: FastifyReply,
) {
  const { measure_uuid, confirmed_value } = bodySchema.parse(request.body)

  const measure = await prisma.measure.findUnique({
    where: { measure_uuid },
    select: {
      measure_uuid: true,
      has_confirmed: true,
    },
  })

  if (!measure) {
    throw new MeasureNotFoundError()
  }

  if (measure.has_confirmed) {
    throw new ConfirmationDuplicate()
  }

  await prisma.measure.update({
    where: { measure_uuid },
    data: { measure_value: confirmed_value, has_confirmed: true },
  })

  return reply.status(200).send({
    success: true,
  })
}
