import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

export const makePet = ({
  id = randomUUID(),
  age = 4,
  breed = 'Golden Retriever',
  description = faker.lorem.paragraph(),
  name = faker.person.firstName(),
  photo = faker.image.urlPlaceholder(),
  traits = ['Brincalhão', 'Fofo'],
  size = 'big',
} = {}) => {
  return {
    id,
    age,
    breed,
    description,
    name,
    photo,
    traits,
    size,
  }
}
