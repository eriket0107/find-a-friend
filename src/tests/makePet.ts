import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

export const makePet = ({
  id = randomUUID(),
  age = 4,
  breed = 'Golden Retriever',
  description = faker.lorem.paragraph(),
  name = faker.person.firstName(),
  traits = ['Brincalhão', 'Fofo'],
  size = 'big',
  photo = 'any_photo.webp',
} = {}) => {
  return {
    id,
    age,
    breed,
    description,
    name,
    traits,
    size,
    photo,
  }
}
