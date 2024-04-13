import cookies from '@fastify/cookie'
import cors from '@fastify/cors'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from '@/env'

import { petsRoutes } from './http/pets/routes'

export const app = fastify()

app.register(cors)
app.register(cookies)

app.register(petsRoutes)

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
