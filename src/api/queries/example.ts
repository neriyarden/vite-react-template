import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { apiClientWithSchema } from '@/api/client'

const exampleSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
})

type Example = z.infer<typeof exampleSchema>

async function getExample(id: number): Promise<Example> {
  return apiClientWithSchema(`/todos/${id}`, exampleSchema)
}

export function useExample(id: number) {
  return useQuery({
    queryKey: ['example', id],
    queryFn: () => getExample(id),
  })
}
