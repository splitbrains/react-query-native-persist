import { Persistor } from 'react-query/persistQueryClient-experimental'
import { StorageAdapter } from './adapters/adapter-interface'

export type PersistorOptions = {
  key: string
  adapter: StorageAdapter
}

export const createNativePersistor = ({
  key,
  adapter,
}: PersistorOptions): Persistor => ({
  persistClient: (persistClient) => adapter.setItem(key, persistClient),
  restoreClient: () => adapter.getItem(key),
  removeClient: () => adapter.removeItem(key),
})
