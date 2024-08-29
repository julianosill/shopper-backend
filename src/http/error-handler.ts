import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

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

  console.log(error)

  return reply.status(500).send({
    error_code: 'INTERNAL_ERROR',
    error_description: 'Internal server error',
  })
}
