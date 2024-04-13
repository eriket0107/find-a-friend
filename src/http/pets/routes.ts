import { FastifyInstance } from 'fastify'

import { register } from './register'

export const petsRoutes = async (app: FastifyInstance) => {
  app.post('/pets', register)
}
