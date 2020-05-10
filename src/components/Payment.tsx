import React from 'react';
import { NavigationScreenProp } from 'react-navigation'

import {
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
  TextInput
} from 'react-native';
import {Icon} from 'react-native-elements'
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
  cardNumber:string
  token:string
  userId:string
  response:string
}

export default class Payment extends React.Component<Props,State> {

  state ={name:'',cardNumber:'',userId:'',token:'',response:''}

 async pay(){

   const  request = await fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.state.userId}/asks/${this.props.route.params.ask.id}`, {
      method: 'PUT',
      headers: 
      new Headers({
        'Authorization': this.state.token.toString(), 
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({state:3})
    })
    const res = await request.json()
    let response=   "Paiement effectué"
    if('err' in res ){
      response= res.description
    }

    
    this.setState({response})
    
    

  }


  async setUserAndToken(){
    let userData = await AsyncStorage.getItem('user')
    if (userData){
      const user = JSON.parse(userData)
      this.setState({userId:user.id})
    }
    let token = await AsyncStorage.getItem('token')
    if (token){
      this.setState({token})
    }

  }

  componentDidMount(){
    this.setUserAndToken()
  }




  hasAsk(){
    return  'ask' in this.props.route.params
  }
  
  render() {
    if(!this.hasAsk()){
      return (<React.Fragment></React.Fragment>)
    }

    const { ask } = this.props.route.params
    const { service } = ask
    return (
        <SafeAreaView>
          <MyHeader navigation={this.props.navigation} name="Paiement" ></MyHeader>
          <View style={styles.view_row}>
            <View style={styles.view}>
            <View style= {{flexDirection:'row'}}>
              <Text style={{textAlign:'center',alignContent:'center',alignSelf:'center',fontWeight:'bold'}}> Nom </Text>
              <TextInput style={styles.input}
              placeholder={"Votre nom"}
              
              onChangeText={name =>{ this.setState({name})}}
              value={this.state.name}>
              </TextInput>
              </View>
              <View style ={{margin:5}}></View>
              <View style= {{flexDirection:'row'}}>
              <Icon
                   name='credit-card'
                   containerStyle={{alignContent:'center',alignSelf:'center', marginHorizontal:5}}
                  type='material'  />
              <TextInput style={styles.input}
              placeholder={"Numero de carte"}
              autoCompleteType="cc-number"
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={cardNumber =>{ this.setState({cardNumber})}}
              value={this.state.cardNumber}>
              </TextInput>
              </View>
              <View style ={{margin:5}}></View>
              <View style={styles.button}>
                <Text style={styles.textButton} onPress={() => this.pay()}>Payer</Text>
              </View>
              {this.state.response !='' && <Text style={{alignSelf:'center'}}>{this.state.response}</Text>}
            </View>
    
            
          </View>
        </SafeAreaView>
    );
  }

}