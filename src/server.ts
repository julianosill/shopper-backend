import fastify from 'fastify'

import { env } from './env'
import { errorHandler } from './http/errors'
import { routes } from './http/routes'

export const app = fastify()

app.setErrorHandler(errorHandler)
app.register(routes)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    if (env.NODE_ENV !== 'test') {
      console.log('HTTP server running on port 3333!')
    }
  })
