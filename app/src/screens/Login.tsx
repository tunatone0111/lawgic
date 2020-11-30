import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { AuthNavProps } from '../Routes';

export default function Landing({navigation, route}: AuthNavProps<'Landing'>) {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={require('../assets/logo.PNG')}/>
      <Text>로그인 페이지</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 120,
    height: 80,
  }
})