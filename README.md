# Find A Friend API

## To start application 

- Feel free to use your favorite *pack manager*

1. `npm install` or `yarn`
2. `npm run dev` or `yarn dev`

- You must also set *docker* environment up
  - Don't forget to configure it to your own way

1. `docker compose up --build`

## Application Rules

- [ ] It should be possible to register a pet
- [ ] It should be possible to list all pets available for adoption in a city
- [ ] It should be possible to filter pets by their characteristics
- [ ] It should be possible to view details of a pet for adoption
- [ ] It should be possible to register as an ORG
- [ ] It should be possible to log in as an ORG

## Business Rules

- [ ] To list the pets, it is mandatory to inform the city
- [ ] An ORG needs to have an address and a WhatsApp number
- [ ] A pet must be linked to an ORG
- [ ] The user who wants to adopt will contact the ORG via WhatsApp
- [ ] All filters, except for the city, are optional
- [ ] For an ORG to access the application as an admin, it needs to be logged in
