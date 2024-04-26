import path from 'node:path'

import { DataSource } from 'typeorm'

const entitiesPath = path.resolve('src', 'db', 'entity', '**/*.ts')
const migrationsPath = path.resolve('src', 'db', 'migration', '**/*.ts')

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'eriket',
  password: '1234',
  database: 'findAfriend',
  synchronize: false,
  logging: true,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  subscribers: [],
})
