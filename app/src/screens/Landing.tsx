import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { AuthNavProps } from '../Routes';

export default function Landing({navigation, route}: AuthNavProps<'Landing'>) {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={require('../assets/logo.PNG')}/>
      <Text>머신러닝 기반 판례 검색 시스템</Text>
      <Button title='LOG IN' onPress={()=>{navigation.navigate('Login')}}></Button>
      <Button title='detail' onPress={()=>{navigation.navigate('PrecForm')}}></Button>
      <StatusBar style="auto" />
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