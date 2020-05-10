import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {Icon} from 'react-native-elements'
import styles from '../../assets/css/services'
import MyHeader from './MyHeader'


export interface Props {
  token:string,
  id:string,
  route: any,
  navigation: NavigationScreenProp<any>,
}


interface State {
  asks:any
  token:string
  userId:string
}

export default class Asks extends React.Component<Props, State> {

  state = {userId:"",token:"",asks:[]}
 
  async fetchAsks(){
    if(this.state.userId!=""){
      const res = await fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.state.userId}/asks/`,{
        headers: 
        new Headers({
          'Authorization': this.state.token, 
          'Content-Type': 'application/json'
        }),

      })
      const resJson = await res.json()
      const asks  = resJson.data.ask
      asks.forEach((ask:any) => {
        ask.service.user= ask.provider 
      });
      this.setState({asks})

      
      
      
      
    }
   
}

async setToken(){
  const token = await AsyncStorage.getItem('token')
  if(!token){
   this.props.navigation.navigate('Connexion')
  }
  else{
    this.setState({token})
  }
}
async setUserId(){
  const user = await AsyncStorage.getItem('user')
  if(user){
    this.setState({userId:JSON.parse(user).id})
  }
}

async componentDidMount(){
    await this.setToken()
    await this.setUserId()
    this.fetchAsks()
}

getStateStr(state:number){
return state ==-1 ? 'refusé' : state ==2 ? 'Validé' : state ==3 ? 'Payé' : 'en attente de réponse'
}

  render() {
  
    return (
      <SafeAreaView>
        <MyHeader navigation={this.props.navigation} name="Demandes" ></MyHeader>
        {this.state.asks.length > 0 &&
                <FlatList<any>
                data={this.state.asks}
                renderItem={({ item }) => 
                <View style={{width:"100%"}}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Details service',{service:item.service})}>
                            <View>
                                <Text style={{ fontSize: 15,fontWeight:'bold'}} >{item.service.category.name} </Text >
                            </View>
                            <Text style={{ fontSize: 15 }} >{item.service.price}€ </Text > 
                            <Text style={{ fontSize: 15 }} >Statut : {this.getStateStr(item.state)} </Text > 
                        </TouchableOpacity>
                        {item.state ==2 && 
                         <TouchableOpacity style ={{flexDirection:'row', margin:5, justifyContent:"flex-end",}} onPress={() => this.props.navigation.navigate('Payment',{ask:item})}>
                           <Text>Payer </Text>
                            <Icon
                            name='add-shopping-cart'
                            type='material'  />
                         </TouchableOpacity>
                        }


                       
                    </View>
                </View>
                
                }
                keyExtractor={item => String(item.id)}
            />
        }

     
  </SafeAreaView>
    );

  }

}