import type { FastifyInstance } from 'fastify'

import {
  confirmMeasureController,
  createMeasuresController,
  getImageController,
  listMeasuresController,
} from './controllers'

export async function routes(app: FastifyInstance) {
  app.post('/upload', createMeasuresController)
  app.patch('/confirm', confirmMeasureController)
  app.get('/:customer_code/list', listMeasuresController)
  app.get('/images/:filename', getImageController)
}
