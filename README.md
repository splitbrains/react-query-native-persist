# react-query-native-persist

This library offers a `react-native` persistor for [`react-query`](https://react-query.tanstack.com/).

It is important to state that this is still an **experimental** feature of `react-query` and is subject to change. This library will try to follow up on any changes that may occur.

> VERY IMPORTANT: This utility is currently in an experimental stage. This means that breaking changes will happen in minor AND patch releases. Use at your own risk. If you choose to rely on this in production in an experimental stage, please lock your version to a patch-level version to avoid unexpected breakages. <sup>[Reference](https://react-query.tanstack.com/plugins/persistQueryClient)

## Installation

```shell
yarn add react-query-native-persist

### or

npm install --save react-query-native-persist
```

## Usage

### Preparation

It's important to set the online status and set a `cacheTime` for the `QueryClient`:

```tsx
import { QueryClient, QueryClientProvider, onlineManager } from 'react-query'
import NetInfo from '@react-native-community/netinfo'

// for the persistence to work properly, it's necessary to know the online status
onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => setOnline(Boolean(state.isConnected))),
)

// construct your QueryClient as you wish
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
})
```

Don't forget to set the `cacheTime`:

> **IMPORTANT** - for persist to work properly, you need to pass QueryClient a cacheTime value to override the default during hydration (as shown above). <sup>[Reference](https://react-query.tanstack.com/plugins/persistQueryClient#usage)

### Basic setup

To make it work you need to create a persistor with `createNativePersistor`. Place this code at a very top level (e.g. `index.js`)

```ts
import { createNativePersistor } from 'react-query-native-persist'
import AsyncStorageAdapter from 'react-query-native-persist/dist/adapters/async-storage'

import { persistQueryClient } from 'react-query/persistQueryClient-experimental'

const persistor = createNativePersistor({
  key: 'MY_APP_PERSISTENCE_KEY',
  adapter: new AsyncStorageAdapter(),
})

persistQueryClient({
  queryClient,
  persistor,
  /* other options */
})
```

## Adapters

There are several adapters to use different storage backends. Currently following are pre-packaged:

- `@react-native-async-storage/async-storage` → `react-query-native-persist/dist/adapters/async-storage`
- `react-native-mmkv-storage` → `react-query-native-persist/dist/adapters/mmkv-storage`

Just create an issue if you need another adapter.
