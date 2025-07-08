import { defineConfig } from 'drizzle-kit'
import { environmentConfig } from './src/config/environment.ts'

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/db/schema/**.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: environmentConfig.databaseUrl
  }
})
