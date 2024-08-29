import type { FastifyInstance } from 'fastify'

import { confirm } from './confirm'
import { upload } from './upload'

export async function routes(app: FastifyInstance) {
  app.post('/upload', upload)
  app.patch('/confirm', confirm)
}
