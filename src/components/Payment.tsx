import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
  TextInput
} from 'react-native';
import MyHeader from './MyHeader'
import styles from '../../assets/css/services'



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

interface State {
  name:string
}

export default class Payment extends React.Component<Props,State> {

  state ={name:''}



  hasService(){
    
    return 'service' in this.props.route.params
  }
  
  render() {
    if(!this.hasService()){
      return (<React.Fragment></React.Fragment>)
    }

    const { service } = this.props.route.params
    const { user } = service
    return (
        <SafeAreaView>
          <MyHeader navigation={this.props.navigation} name="Paiement" ></MyHeader>
          <View style={styles.view_row}>
            <View style={styles.view}>
              <Text style={styles.label}> Nom </Text>
              <TextInput style={styles.input}
              placeholder={"Votre nom"}
              maxLength={4}
              onChangeText={name =>{ this.setState({name})}}
              value={this.state.name}
              >
              </TextInput>
            </View>
          </View>
        </SafeAreaView>
    );
  }

}