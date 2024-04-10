import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'eriket',
  password: '1234',
  database: 'findAfriend',
  synchronize: true,
  logging: true,
  entities: ['/src/entity'],
  migrations: ['/src/db/migration'],
  subscribers: [],
})
