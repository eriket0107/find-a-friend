import cookies from '@fastify/cookie'
import cors from '@fastify/cors'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from '@/env'

import { dataSource } from './db/data-source'

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

export const app = fastify()

app.register(cors)
app.register(cookies)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
