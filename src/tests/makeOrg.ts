import { fakerPT_BR } from '@faker-js/faker'
import { randomUUID } from 'crypto'

export const makeAddress = ({
  city = fakerPT_BR.location.city(),
  state = fakerPT_BR.location.state(),
  country = 'BRA',
  zipCode = fakerPT_BR.location.zipCode(),
  street = fakerPT_BR.location.street(),
} = {}) => {
  return {
    city,
    state,
    country,
    zipCode,
    street,
  }
}

export const makeOrganization = ({
  address = makeAddress(),
  id = randomUUID(),
  cnpj = fakerPT_BR.string.alphanumeric(14),
  email = fakerPT_BR.internet.email(),
  name = fakerPT_BR.company.name(),
  password = fakerPT_BR.internet.password(),
  phone = fakerPT_BR.phone.number(),
} = {}) => {
  return {
    address,
    id,
    cnpj,
    email,
    name,
    password,
    phone,
  }
}
