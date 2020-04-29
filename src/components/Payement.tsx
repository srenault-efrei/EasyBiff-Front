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
  id:string,
  route: any,
  navigation: NavigationScreenProp<any>,
  service: Svc
}

interface User {
    id: string,
    lastname: string,
    firstname: string,
    inscription: string,
    age: string,
    biographie: string
}

interface Svc {
    distance: number,
    category: string,
    heure: string,
    price: number,
    user: User
}

interface State {}

export default class Payment extends React.Component<Props, State> {
  
  componentDidMount(){
      console.log(this.props.route.params.service)
  }
  
  render() {
    const { service } = this.props.route.params
    const { user } = service
    return (
      <SafeAreaView style={styles.view}>
        <MyHeader navigation={this.props.navigation} name="Payment" ></MyHeader>
      <View style={styles.topView}>
        <Text >Payer pour obtenir ce service</Text>
        <Text >Type de service: {service.category}</Text>
        <Text >Customer: {`${user.firstname} ${user.lastname} (${user.age} ans)`}</Text>
        <Text >Heure: {service.heure}</Text>
        <Text >TOTAL: {service.price}€</Text>
      </View>
      <View style={styles.loginView}>
        </View>
     
  </SafeAreaView>
    );

  }

}