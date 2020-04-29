import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Button } from "react-native-elements";
import { NavigationScreenProp } from 'react-navigation';
import style from '../../assets/css/showService'


export interface Props {
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

interface Svc {
  distance: number,
  category: string,
  heure: string,
  user: User,
  price: number
}

interface State {
  service: Svc,
  token: String
}

export default class Details extends React.Component<Props, State> {
  state: State = {
    service: {
        distance: 0,
        category: '',
        heure: '',
        user: {
            id: '',
            lastname: '',
            firstname: '',
            inscription: '',
            age: '',
            biographie: ''
        },
        price: 0
    },
    token: this.props.route.params.token
  }


  async componentDidMount(){
    /* this.fetch() */
    this.getService()
  }

  getService = async (): Promise<void | never> => {
    return fetch('https://eazybiff-server.herokuapp.com/api/services/3', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        const tab = json.data.service.dateDebut.split('T')[1].split(':')
        const heure = tab[0] + ':' + tab [1]

        const date = json.data.service.user.createdAt.split('T')[0]
        const birthday = json.data.service.user.birthday.split('T')[0]

        const user = {    
            id: json.data.service.user.id,
            lastname: json.data.service.user.lastname,
            firstname: json.data.service.user.firstname,
            inscription: date,
            age: this.getAge(birthday),
            biographie: json.data.service.user.bio
        }

        const service = {
            distance: json.data.service.radius.kilometer,
            category: json.data.service.category.name,
            heure,
            user,
            price: json.data.service.price
        }

        this.setState({ service })
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

  render() {
    const { service, token } = this.state
    console.log(service.category)
    return (
      <View>
            <View style={style.headerContent}>
              <Text style={style.name}>{service.category}</Text>
              <Text>Heure de disponibilité : {service.heure}</Text>
              <Text>Tarif annoncé : {service.price}€</Text>
              <Text>Distance : {this.distance(48.912044, 2.257175, 48.910668, 2.255142)} (simulation)</Text>
            </View>
            <View style={style.headerContent}>
                <Image style={style.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <Text style={style.name}>{service.user.lastname + ' ' + service.user.firstname} </Text>
                <Text style={style.userInfo}>{service.user.age} ans</Text>
                  <Text style={style.userInfo}>Membre depuis le {service.user.inscription}</Text>
                  { service.user.biographie ? <Text style={style.userInfo}>Biographie : {service.user.biographie}</Text>: null }
                <Text style={style.userInfo}>A bientôt j'espère.</Text>
            </View>
            <Button
            style={style.headerContent}
            title="Payer pour ce service"
            type="solid"
            onPress={() => this.props.navigation.navigate('Payment',{ token, id: service.user.id, service })}
          />
      </View>
    )
  }

}