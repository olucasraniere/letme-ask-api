import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine( f => {
  return {
    rooms: {
      count: 20, // criará 20 salas fakes
      columns: {
        name: f.companyName(), // gera o nome de uma empresa aleatória
        description: f.loremIpsum() // gera um loren ipsum aleatório
      }
    }
  }
})

await sql.end()

console.log('Database seeded')
