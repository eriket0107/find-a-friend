import { FastifyInstance } from 'fastify'

import { register } from './register'
import { uploadPhoto } from './upload-photo'

export const petsRoutes = async (app: FastifyInstance) => {
  app.post('/pets', register)
  app.post('/pet/:petId/photo', uploadPhoto)
}
