import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3333'),
  DATABASE_URL: z.string().url().startsWith('postgresql://'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  CORS_ORIGIN: z.string().default('*'),
})

type Environment = z.infer<typeof envSchema>

class EnvironmentConfig {
  private static instance: EnvironmentConfig
  private _config: Environment

  private constructor() {
    const result = envSchema.safeParse(process.env)

    if (!result.success) {
      console.error('❌ Invalid environment variables:', result.error.format())
      process.exit(1)
    }

    this._config = result.data
  }

  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig()
    }
    return EnvironmentConfig.instance
  }

  public get config(): Environment {
    return this._config
  }

  public get nodeEnv(): string {
    return this._config.NODE_ENV
  }

  public get port(): number {
    return this._config.PORT
  }

  public get databaseUrl(): string {
    return this._config.DATABASE_URL
  }

  public get logLevel(): string {
    return this._config.LOG_LEVEL
  }

  public get corsOrigin(): string {
    return this._config.CORS_ORIGIN
  }

  public isDevelopment(): boolean {
    return this._config.NODE_ENV === 'development'
  }

  public isProduction(): boolean {
    return this._config.NODE_ENV === 'production'
  }

  public isTest(): boolean {
    return this._config.NODE_ENV === 'test'
  }
}

export const environmentConfig = EnvironmentConfig.getInstance()
