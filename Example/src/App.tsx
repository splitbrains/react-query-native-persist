import React from 'react'

import { createNativePersistor } from 'react-query-native-persist'
import AsyncStorageAdapter from 'react-query-native-persist/dist/adapters/async-storage'

import { QueryClient, QueryClientProvider, onlineManager } from 'react-query'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import NetInfo from '@react-native-community/netinfo'

import Main from './Main'

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => setOnline(Boolean(state.isConnected))),
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
})

export const ASYNC_PERSISTENCE_KEY = '__REACT_QUERY_ASYNC_PERSISTENCE__'

persistQueryClient({
  queryClient,
  persistor: createNativePersistor({
    key: ASYNC_PERSISTENCE_KEY,
    adapter: new AsyncStorageAdapter(),
  }),
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
)

export default App
