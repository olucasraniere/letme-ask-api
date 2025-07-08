import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { environmentConfig } from '../config/environment.ts'
import { schema } from './schema/index.ts'

export const sql = postgres(environmentConfig.databaseUrl)
export const db = drizzle(sql, {
  schema,
  casing: 'snake_case'
})
