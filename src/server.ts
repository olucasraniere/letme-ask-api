import { fastify } from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { environmentConfig } from './config/environment.ts'

const app = fastify({
  logger: {
    level: environmentConfig.logLevel,
    transport: environmentConfig.isDevelopment() ? {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    } : undefined,
  },
}).withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/', async (request, reply) => {
  return { message: 'API REST com Fastify e TypeScript!' }
})

app.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3333

    await app.listen({ port })
    //console.log(`🚀 HTTP server running in http://localhost:${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
