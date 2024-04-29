import { FastifyInstance } from 'fastify'

import { register } from './register'
import { uploadPhoto } from './upload-photo'

export const petsRoutes = async (app: FastifyInstance) => {
  app.post('/pets', register)
  // '/pet/:id/photo'
  app.post('/pet/photo', uploadPhoto)
}
