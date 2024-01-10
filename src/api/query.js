import { QueryClient, useQueryClient } from '@tanstack/react-query'

export const queryClient = useQueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * (60 * 1000),
    },
  },
})
