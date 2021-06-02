import { PersistedClient } from 'react-query/persistQueryClient-experimental'

export interface StorageAdapter {
  setItem: (key: string, value: PersistedClient) => Promise<void>
  getItem: (key: string) => Promise<PersistedClient | undefined>
  removeItem: (key: string) => Promise<void>
}
