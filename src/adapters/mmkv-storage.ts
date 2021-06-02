import Storage from 'react-native-mmkv-storage'
import { PersistedClient } from 'react-query/persistQueryClient-experimental'

import { StorageAdapter } from './adapter-interface'

export default class MMKVStorageAdapter implements StorageAdapter {
  private storageInstance: Storage.API

  constructor(storageInstance: Storage.API) {
    this.storageInstance = storageInstance
  }

  async setItem(key: string, value: PersistedClient) {
    this.storageInstance.setString(key, JSON.stringify(value))
  }

  async getItem(key: string) {
    const value = this.storageInstance.getString(key)

    try {
      return value ? (JSON.parse(value) as PersistedClient) : undefined
    } catch {
      return undefined
    }
  }

  async removeItem(key: string) {
    this.storageInstance.removeItem(key)
  }
}
