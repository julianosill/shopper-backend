import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { convertAndSaveImage, extractDataFromImage } from '@/helpers'
import { DoubleReportError } from '@/http/error-classes'
import { prisma } from '@/libs/prisma'

const base64ImageRegex =
  /^data:image\/(jpeg|png|gif|bmp|webp);base64,[A-Za-z0-9+/]+={0,2}$/
const bodySchema = z.object({
  image: z.string().regex(base64ImageRegex, { message: 'Imagem inválida' }),
  customer_code: z.string({ message: 'Código do usuário inválido' }),
  measure_datetime: z
    .string({ message: 'Data de leitura inválida' })
    .datetime({ message: 'Data de leitura inválida' }),
  measure_type: z.enum(['WATER', 'GAS'], {
    message: 'Tipo de medição não permitida',
  }),
})

type BodySchema = z.infer<typeof bodySchema>

export async function upload(
  request: FastifyRequest<{ Body: BodySchema }>,
  reply: FastifyReply,
) {
  const { image, customer_code, measure_datetime, measure_type } =
    bodySchema.parse(request.body)

  const user = await prisma.customer.findUnique({
    where: { code: customer_code },
  })

  if (!user) {
    await prisma.customer.create({ data: { code: customer_code } })
  }

  const alreadyReported = await prisma.measure.findFirst({
    where: { customer_code, measure_datetime, measure_type },
    select: { customer_code: true, measure_datetime: true, measure_type: true },
  })

  if (alreadyReported) {
    throw new DoubleReportError()
  }

  const imageFile = convertAndSaveImage(image)
  const imageUrl = `${request.protocol}://${request.hostname}/images/${imageFile.name}`

  const { measureValue } = await extractDataFromImage(imageFile.path)

  const { image_url, measure_uuid } = await prisma.measure.create({
    data: {
      measure_value: measureValue,
      measure_datetime,
      measure_type,
      image_url: imageUrl,
      customer_code,
    },
  })

  const response = { image_url, measure_value: measureValue, measure_uuid }

  return reply.status(200).send(response)
}
