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

export default class ServicesCusto extends React.Component<Props, State> {
  
  componentDidMount(){
    if(!this.props.route?.params){
      this.props.navigation.navigate('Connexion')
    }
  }
  
  render() {
    return (
      <SafeAreaView style={styles.view}>
        <MyHeader navigation={this.props.navigation} name="Services" ></MyHeader>
      <View style={styles.topView}>
          <Text >Services custo</Text>
      </View>
      <View style={styles.loginView}>
        </View>
     
  </SafeAreaView>
    );

  }

}