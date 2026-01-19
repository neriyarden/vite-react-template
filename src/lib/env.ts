import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_URL: z.string().url(),
  VITE_API_BASE_URL: z.string().url(),
})

type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const result = envSchema.safeParse(import.meta.env)

  if (!result.success) {
    console.error('Environment validation failed:', result.error.format())
    throw new Error('Invalid environment variables')
  }

  return result.data
}

export const env = validateEnv()
