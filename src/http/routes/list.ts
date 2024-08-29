import type { FastifyReply, FastifyRequest } from 'fastify'
import { MeasuresNotFoundError } from 'http/error-classes'
import { prisma } from 'libs/prisma'
import { z } from 'zod'

const paramSchema = z.object({
  customer_code: z.string({ message: 'Código do usuário inválido' }),
})

const querySchema = z.object({
  measure_type: z
    .string()
    .transform((data) => data.toUpperCase())
    .refine((data) => data === 'WATER' || data === 'GAS', {
      message: 'Tipo de medição não permitida',
      path: ['INVALID_TYPE'],
    })
    .optional(),
})

type ParamSchema = z.infer<typeof paramSchema>
type QuerySchema = z.infer<typeof querySchema>

export async function list(
  request: FastifyRequest<{ Params: ParamSchema; Querystring: QuerySchema }>,
  reply: FastifyReply,
) {
  const { customer_code } = paramSchema.parse(request.params)
  const { measure_type } = querySchema.parse(request.query)

  const measures = await prisma.measure.findMany({
    where: {
      customer_code,
      measure_type,
    },
    select: {
      measure_uuid: true,
      measure_datetime: true,
      measure_type: true,
      has_confirmed: true,
      image_url: true,
    },
  })

  if (measures.length <= 0) {
    throw new MeasuresNotFoundError()
  }

  const response = { customer_code, measures }

  return reply.status(200).send(response)
}
