import { z } from 'zod'

import { env } from '@/lib/env'

export class ApiError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

type FetchOptions = RequestInit & {
  params?: Record<string, string>
  retry?: number
  retryDelay?: number
}

async function fetchWithRetry(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { retry = 0, retryDelay = 1000, ...fetchOptions } = options

  try {
    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      )
    }

    return response
  } catch (error) {
    if (retry > 0 && error instanceof ApiError && error.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay))
      return fetchWithRetry(url, { ...options, retry: retry - 1 })
    }
    throw error
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options

  const url = new URL(endpoint, env.VITE_API_BASE_URL)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  const response = await fetchWithRetry(url.toString(), {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  })

  return response.json()
}

export async function apiClientWithSchema<T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  options: FetchOptions = {}
): Promise<T> {
  const data = await apiClient<unknown>(endpoint, options)
  return schema.parse(data)
}
