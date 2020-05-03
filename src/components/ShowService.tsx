import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import { Card } from 'react-native-elements'
import { NavigationScreenProp } from 'react-navigation';
import MyHeader from './MyHeader'
import style from '../../assets/css/showService'
import styles from '../../assets/css/styles'


interface Props {
    navigation: NavigationScreenProp<any>,
    route: any
}

interface User {
    id: string,
    lastname: string,
    firstname: string,
    inscription: string,
    age: string,
    biographie: string
}

interface State {
  reqSent: boolean,
  service: any,
  serviceUser: User,
  user: User,
  token: String
}

export default class Details extends React.Component<Props, State> {
  state: State = {
    reqSent: false,
    service: this.props.route.params.service,
    serviceUser: {
      id: '',
      lastname: '',
      firstname: '',
      inscription: '',
      age: '',
      biographie: ''
    },
    user: {
        id: '',
        lastname: '',
        firstname: '',
        inscription: '',
        age: '',
        biographie: ''
    },
    token: ''
  }

  async componentDidMount(){
    await this.setDataStorage()
    this.createInfos()
  }

  createInfos(){
    const {service} = this.state
    const birthday = service.user.birthday.split('T')[0]
    const tab = service.dateDebut.split('T')[1].split(':')
    const heure = tab[0] + 'h' + tab [1]

    const data = {
      id: service.id,
      state: service.state,
      distance: service.radius.kilometer,
      category: service.category.name,
      heure,
      serviceUser: service.user,
      price: service.price
    }

    const serviceUser = {
      id: service.user.id,
      lastname: service.user.lastname,
      firstname: service.user.firstname,
      age: this.getAge(birthday),
      inscription: service.user.createdAt.split('T')[0],
      biographie: service.user.bio
    }
    
    this.setState({ service: data, serviceUser })
  }

  async setDataStorage() {
    let user = await AsyncStorage.getItem('user')
    let token = await AsyncStorage.getItem('token')
    if (!user) {
      this.props.navigation.navigate("Connexion")
    } else if (user && token) {
        let obj = JSON.parse(user)
        obj.inscription = obj.createdAt.split('T')[0]
        obj.birthday = obj.birthday.split('T')[0]
        obj.age = this.getAge(obj.birthday)
        this.setState({
        user: obj,
        token
        })
    }
  }

  ask = async (): Promise<void | never> => {
    const { token, service, user } = this.state
    const serviceId = service.id
    const userId = user.id
    const obj = {
      serviceId
    }
    return fetch(`https://eazybiff-server.herokuapp.com/api/users/${userId}/asks/`, {
      method: 'POST',
      headers: 
      new Headers({
        'Authorization': token.toString(), 
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(obj)
    })
      .then((response) => response.json())
      .then( () => {
        this.setState({ reqSent: true })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getAge(birthday: string)
  {
  const newBirthday = new Date(birthday);
  return new Number((new Date().getTime() - newBirthday.getTime()) / 31536000000).toFixed(0)
  }

  distance(lat1: number, lon1: number, lat2: number, lon2: number) {
      const R = 6371; // km (change this constant to get miles)
      const dLat = (lat2-lat1) * Math.PI / 180;
      const dLon = (lon2-lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const d = R * c;
      if (d>1) return Math.round(d)+"km";
      else if (d<=1) return Math.round(d*1000)+"m";
      return d;
  }

  displayDetails(){
    const { service, serviceUser } = this.state
    return (
      <View style={styles.loginView}>
              
        <Text style={style.title}></Text>
        <Text>Heure de disponibilité :{service.heure}</Text>
        <Text>Tarif annoncé :>{service.price} €</Text>
        <Text>Distance : {this.distance(48.912044, 2.257175, 48.910668, 2.255142)} (simulation)</Text>
        

        <Card
          title={serviceUser.firstname + ' ' + serviceUser.lastname}>
          <Image style={style.avatar}
            source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <Text style={[style.userInfo, {marginBottom: 20, fontStyle: 'italic'}]}> {serviceUser.age} ans</Text>
          { serviceUser.biographie ? <Text style={[style.userInfo, {marginBottom: 10}]}>Biographie : {serviceUser.biographie}</Text>: null }
          <Text style={[styles.bottomView, {fontStyle: 'italic'}]}>Membre depuis le {serviceUser.inscription}.</Text>
        </Card>

        <Text style={[style.userInfo, {marginTop: 10, marginBottom: 20}]}>A bientôt j'espère.</Text>

        <View style={styles.button}>
          <Text style={styles.textButton} onPress={() => this.ask()}>Demander ce service</Text>
        </View>
      
      </View>
    )
  }

  isAsk(){
    return (
      <View style={styles.loginView}>
        <Text>Demande envoyée !</Text>
      </View>
    )
  }

  redirect(){
    const { navigation } = this.props
    setTimeout( () => navigation.navigate('Services'), 3000)
  }

  render() {
    const { reqSent } = this.state
    return (
      <SafeAreaView style={styles.safeArea}>
            <MyHeader navigation={this.props.navigation} name="Details service" ></MyHeader>
            { reqSent === true ? this.isAsk() : this.displayDetails() }
      </SafeAreaView>
    )
  }

}