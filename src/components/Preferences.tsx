import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';
import styles from '../../assets/css/styles'
import MyHeader from './MyHeader'


export interface Props {
  token:string,
  id:string
  route:any
  params:any
  navigation: NavigationScreenProp<any>
}

interface State {}

export default class Preferences extends React.Component<Props, State> {
  

  
  render() {
    return (
      <SafeAreaView style={styles.view}>
        <MyHeader navigation={this.props.navigation} name={this.constructor.name} ></MyHeader>
      <View style={styles.topView}>
          <Text >Preferences</Text>
      </View>
      <View style={styles.loginView}>
        </View>
     
  </SafeAreaView>
    );

  }

}
