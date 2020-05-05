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

interface Coords {
  lat: number,
  long: number
}

interface State {
  iSent: boolean,
  reqSent: number,
  waitingPayment: boolean,
  service: any,
  tab: Array<any>,
  serviceUser: User,
  user: User,
  userCoords: Coords,
  token: String,
  cityInfos: any,
  cityCoords: Coords,
}

export default class Details extends React.Component<Props, State> {
  state: State = {
    iSent: false,
    tab: [],
    reqSent: 0,
    waitingPayment: false,
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
    cityInfos:{},
    cityCoords: {
      lat: 0,
      long: 0
    },
    userCoords: {
      lat: 0,
      long: 0
    },
    token: ''
  }

  async componentDidMount(){
    await this.setDataStorage()
    this.createInfos()
    await this.getCity()
    this.getCoordinates()
    await this.getState()
    this.verif()
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
      price: service.price,
      postcode: service.postalCode,
      city: service.city
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

  getState = async (): Promise<void | never> => {
    const { token, user } = this.state
    return fetch(`https://eazybiff-server.herokuapp.com/api/users/${user.id}/asks/`, {
      method: 'GET',
      headers: 
      new Headers({
        'Authorization': token.toString(), 
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ tab: json.data.ask })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  verif = (): void => {
      const { service, tab } = this.state

    console.log('appServiceId : ' + service.id)
    tab.map( (line:any) => {


      if(line.service.id === service.id && line.state){

        if(line.state === 1){
          console.log('dbServiceId : ' + line.service.id)
          console.log('dbState : ' + line.state)
          console.log('Demande déjà effectuée.')
          this.setState({ reqSent: 1 })
        }

        else if(line.state === 2){
          console.log('dbServiceId : ' + line.service.id)
          console.log('dbState : ' + line.state)
          console.log('Demande en attente de paiement')
          this.setState({ reqSent: 2, waitingPayment: true })
        }

        else if(line.service.id === -1){
          console.log('dbServiceId : ' + line.service.id)
          console.log('dbState : ' + line.state)
          console.log('Demande refusée')
          this.setState({ reqSent: -1 })
        } 

      }else{
        console.log('Aucune demande déjà effectuée.')
        this.setState({ reqSent: 0})
      }

    })
  }

  ask = async (): Promise<void | never> => {
    const { token, service, user } = this.state
    const serviceId = service.id
    const userId = user.id
    const obj = {
      serviceId
    }
    return fetch(`https://eazybiff-server.herokuapp.com/api/users/1f38ec56-7757-42d7-8f13-cca1df2f780c/asks/`, {
      method: 'POST',
      headers: 
      new Headers({
        'Authorization': token.toString(), 
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(obj)
    })
      .then((response) => {
        response.json()
        this.setState({iSent: true})
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

  distance(obj1: Coords, obj2: Coords) {
    const lat1 = obj1.lat
    const lat2 = obj2.lat
    const lon1 = obj1.long
    const lon2 = obj2.long
    if (lat1 != 0 && lat2 != 0 && lon1 != 0 && lon2 != 0){
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
    } else {
      return null
    }
  }

  getCity = async (): Promise<void | never> => {
        const { service } = this.state
        const postcode = service.postcode
        return fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${postcode}&type=municipality&autocomplete=0&limit=1`, {
          method: 'Get',
          headers: 
          new Headers({
            'Content-Type': 'application/json'
          }),
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({cityInfos: json})
        })
        .catch((error) => {
        console.error(error);
        });
      }
    
      getCoordinates = () => {
        const { service } = this.state
        const { cityInfos } = this.state
        
        if(cityInfos.features[0]){
          const {city} = cityInfos.features[0].properties
          if(city === service.city){
            const obj = {
              lat: cityInfos.features[0].geometry.coordinates[0],
              long: cityInfos.features[0].geometry.coordinates[1]
            }
            this.setState({cityCoords: obj})
            this.getLocation()
          }
        }
      }

      getLocation() {
        navigator.geolocation.getCurrentPosition(
          position => {
            const obj = {
              lat: position.coords.longitude,
              long: position.coords.latitude
            }
            this.setState({ userCoords: obj })
          },
          error => alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }

  displayDetails(){
    const { service, serviceUser, cityCoords, userCoords } = this.state
    const distance = this.distance(userCoords, cityCoords)
    return (
      <View style={styles.loginView}>
              
        <Text style={style.title}></Text>
        <Text>Heure de disponibilité : <Text style={style.infos}>{service.heure}</Text></Text>
        <Text>Tarif annoncé : <Text style={style.infos}>{service.price} €</Text></Text>
        { distance != null ? <Text>Distance : <Text style={style.infos}>{distance}</Text></Text>: null }
        

        <Card
          title={serviceUser.firstname + ' ' + serviceUser.lastname}>
          <Image style={style.avatar}
            source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <Text style={[style.userInfo, {marginBottom: 20, fontStyle: 'italic'}]}> {serviceUser.age} ans</Text>
          { serviceUser.biographie ? <Text style={[style.userInfo, {marginBottom: 10}]}>Biographie : {serviceUser.biographie}</Text>: null }
          <Text style={[styles.bottomView, {fontStyle: 'italic'}]}>Membre depuis le {serviceUser.inscription}.</Text>
        </Card>

        <Text style={[style.userInfo, {marginTop: 10, marginBottom: 20}]}>A bientôt j'espère.</Text>

        {this.displayButton()}

        <View style={[styles.button, {marginTop: 10}]}>
          <Text style={styles.textButton} onPress={() => this.props.navigation.navigate('Services')}>Retour aux services</Text>
        </View>
      
      </View>
    )
  }

  displayButton(){
    const { reqSent, waitingPayment } = this.state
    if(reqSent === 0){
      return(
        <View style={styles.button}>
        <Text style={styles.textButton} onPress={() => this.ask()}>Demander ce service</Text>
        </View>
      )
    } else if(reqSent === 1){
        return(
          <Text>Vous avez déjà demandé ce service et êtes actuellement en attente d'une réponse.</Text>
        )
    } else if(reqSent === 2 && waitingPayment){
        return(
          <View style={styles.button}>
          <Text style={styles.textButton} onPress={() => this.props.navigation.navigate('Payment')}>Payer ce service</Text>
          </View>
        )
    } else if(reqSent === -1){
      return(
        <Text>Votre demande pour ce service a été refusée</Text>
      )
  } 
  }

  isAsk(){
    const { navigation } = this.props
    setTimeout( () => navigation.navigate('Services'), 3000)
    return (
      <View style={styles.loginView}>
        <Text>Demande envoyée !</Text>
      </View>
    )
  }

  render() {
    const { iSent } = this.state
    return (
      <SafeAreaView style={styles.safeArea}>
            <MyHeader navigation={this.props.navigation} name="Details service" ></MyHeader>
            { iSent === true ? this.isAsk() : this.displayDetails() }
      </SafeAreaView>
    )
  }

}