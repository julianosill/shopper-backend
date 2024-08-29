import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import {
  ConfirmationDuplicate,
  DoubleReportError,
  ImageNotFoundError,
  MeasureNotFoundError,
  MeasuresNotFoundError,
} from './error-classes'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    const { message, path } = error.issues[0]
    const errorCode = path[1] ? path[1] : 'INVALID_DATA'

    return reply.status(400).send({
      error_code: errorCode,
      error_description: message,
    })
  }

  if (error instanceof DoubleReportError) {
    return reply.status(409).send({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Leitura do mês já realizada',
    })
  }

  if (error instanceof MeasureNotFoundError) {
    return reply.status(404).send({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura do mês não encontrada',
    })
  }

  if (error instanceof ConfirmationDuplicate) {
    return reply.status(409).send({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura do mês já confirmada',
    })
  }

  if (error instanceof MeasuresNotFoundError) {
    return reply.status(404).send({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: 'Nenhuma leitura encontrada',
    })
  }

  if (error instanceof ImageNotFoundError) {
    return reply.status(404).send({
      error_code: 'IMAGE_NOT_FOUND',
      error_description: 'Imagem não encontrada',
    })
  }

  console.log(error)

  return reply.status(500).send({
    error_code: 'INTERNAL_ERROR',
    error_description:
      'Ocorreu um erro inesperado, verifique o console para mais detalhes.',
  })
}
