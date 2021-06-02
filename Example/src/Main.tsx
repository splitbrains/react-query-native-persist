import React from 'react'
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native'
import { useQuery } from 'react-query'
import { User } from './UserInterface'

const Main = () => {
  const query = useQuery<User>('RANDOM_USER', async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users/1')
    return resp.json()
  })

  const { data: user, isSuccess } = query

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isSuccess && user ? (
        <View style={{ paddingHorizontal: 20 }}>
          <Text>
            Name: {user.name} ({user.username})
          </Text>
          <Text>Employed at: {user.company.name}</Text>
          <Text>Phone number: {user.phone}</Text>
          <Text style={{ paddingTop: 20 }}>
            Data last updated at:{' '}
            {new Date(query.dataUpdatedAt).toLocaleString()}
          </Text>
          <Text>Query status: {query.status}</Text>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )}
    </SafeAreaView>
  )
}

export default Main
