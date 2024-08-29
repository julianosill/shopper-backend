import fastify from 'fastify'
import { errorHandler } from 'http/error-handler'
import { routes } from 'http/routes'

const app = fastify()

app.setErrorHandler(errorHandler)
app.register(routes)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log(`HTTP server running on port ${3333}!`)
  })
