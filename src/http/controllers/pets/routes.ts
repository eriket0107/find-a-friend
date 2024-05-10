import { FastifyInstance } from 'fastify'

import { getPhoto } from './get-photo'
import { register } from './register'
import { uploadPhoto } from './upload-photo'

export const petsRoutes = async (app: FastifyInstance) => {
  app.post('/pet', register)
  app.patch('/pet/:petId/photo', uploadPhoto)
  app.get('/pet/:petId/photo', getPhoto)
}
