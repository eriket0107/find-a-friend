# Find A Friend API

## To start application

- Feel free to use your favorite *pack manager*

1. `npm install` or `yarn`
2. `npm run dev` or `yarn dev`

- You must also set *docker* environment up
  - Don't forget to configure it to your own way

1. `docker compose up --build`

## Application Rules

- [X] It should be possible to register a pet
- [X] It should be possible to list all pets available for adoption in a Org
- [X] It should be possible to list all pets available for adoption in a City
- [X] It should be possible to filter pets by their characteristics
- [X] It should be possible to view details of a pet for adoption (name, photo, description, age, breed)
- [X] It should be possible to register as an ORG
- [ ] It should be possible to register as an User
- [ ] It should be possible to log in and log out as an ORG
- [ ] It should be possible to log in and log out as an user
<!-- - [ ] It should be able to contact the org through message chat??? -->

## Business Rules

- [ ] To list the pets, it is mandatory to inform the city
- [X] An ORG needs to have an address and a WhatsApp number (name, address, phone, cpnj)
- [ ] It should be possible to list all ORG pets
- [X] A pet must be linked to an ORG
<!-- - [ ] The user who wants to adopt will contact the ORG through chat -->
- [ ] All filters, except for the city, are optional
- [ ] For an ORG to access the application as an admin, it needs to be logged in
