import type { FastifyInstance } from 'fastify'

import { upload } from './upload'

export async function routes(app: FastifyInstance) {
  app.post('/upload', upload)
}
