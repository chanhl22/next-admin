'use client'
import { useState, type ReactNode } from 'react'

import { type Query, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

export default function Providers({ children }: { children: ReactNode }) {
  const [{ queryClient, persister }] = useState(() => ({
    queryClient: new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          gcTime: 1000 * 60 * 60 * 24 // 기본 세팅값 24시간
        }
      }
    }),
    persister: createAsyncStoragePersister({
      storage: typeof window !== 'undefined' ? window.localStorage : null as any
    })
  }))

  const shouldPersistQuery = (query: Query) => {
    const persistFlag = query.meta?.persist

    if (persistFlag === true) return true
    if (persistFlag === false) return false

    // meta 안 달린 쿼리에 대한 기본 정책 (원하는 대로)
    // 예: 기본은 persist 안 함
    return false
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query: Query) => shouldPersistQuery(query)
        }
      }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}