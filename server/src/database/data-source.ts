import 'dotenv/config';

import { DataSource } from 'typeorm';

import { Building } from '../buildings/entities/building.entity';

export default new DataSource({
  type: 'postgres',

  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),

  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,

  database: process.env.DATABASE_NAME,

  entities: [
    Building,
  ],

  migrations: [
    'src/database/migrations/*.ts',
  ],
});