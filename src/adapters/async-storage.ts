import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistedClient } from 'react-query/persistQueryClient-experimental'

import { StorageAdapter } from './adapter-interface'

export default class AsyncStorageAdapter implements StorageAdapter {
  async setItem(key: string, value: PersistedClient) {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  }

  async getItem(key: string) {
    const value = await AsyncStorage.getItem(key)

    try {
      return value ? (JSON.parse(value) as PersistedClient) : undefined
    } catch {
      return undefined
    }
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key)
  }
}
