import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import {
  PrismaCustomersRepository,
  PrismaMeasuresRepository,
} from '@/repositories/prisma'
import { MEASURE_TYPES } from '@/repositories/types'
import { CreateCustomerService, CreateMeasureService } from '@/services'

const base64ImageRegex =
  /^data:image\/(jpeg|png|gif|bmp|webp);base64,[A-Za-z0-9+/]+={0,2}$/
const bodySchema = z.object({
  image: z.string().regex(base64ImageRegex, { message: 'Imagem inválida' }),
  customer_code: z.string({ message: 'Código do usuário inválido' }),
  measure_datetime: z
    .string({ message: 'Data de leitura inválida' })
    .datetime({ message: 'Data de leitura inválida' }),
  measure_type: z.enum(MEASURE_TYPES, {
    message: 'Tipo de medição não permitida',
  }),
})

type BodySchema = z.infer<typeof bodySchema>

export async function createMeasuresController(
  request: FastifyRequest<{ Body: BodySchema }>,
  reply: FastifyReply,
) {
  const { image, customer_code, measure_datetime, measure_type } =
    bodySchema.parse(request.body)

  const customersRepository = new PrismaCustomersRepository()
  const createCustomerService = new CreateCustomerService(customersRepository)
  await createCustomerService.execute({ code: customer_code })

  const measuresRepository = new PrismaMeasuresRepository()
  const createMeasureService = new CreateMeasureService(measuresRepository)
  const baseImageURL = `${request.protocol}://${request.hostname}/images`
  const response = await createMeasureService.execute({
    image,
    baseImageURL,
    customer_code,
    measure_datetime: new Date(measure_datetime),
    measure_type,
  })

  return reply.status(200).send(response)
}
