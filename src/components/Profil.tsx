import React, { Component } from 'react';
import moment from 'moment'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import styles from '../../assets/css/styles'
import style from '../../assets/css/profile'
import { Button, Input } from "react-native-elements";
import { NavigationScreenProp } from 'react-navigation'

export interface Props {
  navigation: NavigationScreenProp<any>,
  route: any
}

interface Infos {
  lastname: string,
  firstname: string,
  birthday: string,
  bio: string | null,
  phone: string
}

interface State {
  data: Infos,
  longitude: number,
  latitude: number,
  user: any,
  token: String,
  btnDisabled: boolean,
}

export default class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      data: {
        lastname: '',
        firstname: '',
        birthday: '',
        bio: null,
        phone: 'string'
      },
      longitude: 0,
      latitude: 0,
      user: {},
      token: '',
      btnDisabled: true,
    };
    this.handleReload = this.handleReload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  infos: Infos = {
    lastname: '',
    firstname: '',
    birthday: '',
    bio: null,
    phone: '',
  }

  async componentDidMount(){
    await this.setDataStorage()
    this.createInfos()
    this.getLocation()
    console.log(this.props.route.params)
  }

  async setDataStorage() {
    let user = await AsyncStorage.getItem('user')
    let token = await AsyncStorage.getItem('token')
    if (!user) {
      this.props.navigation.navigate("Connexion")
    } else if (user && token) {

      this.setState({
        user: JSON.parse(user),
        token
      })
    }
  }

  handleReload() {
    this.getLocation()
  }

  handleChange(field: string, value: string) {
    const join = value
    if(field === 'lastname'){
      this.infos.lastname = join
    } 
    else if(field === 'firstname'){
      this.infos.firstname = join
    } 
    else if(field === 'birthday'){
      /* this.testDate(field) */
      this.infos.birthday = join
    } 
    else if(field === 'bio'){
      if(join === ''){
        this.infos.bio = null
      } else {
        this.infos.bio = join
      }
    } 
    else if(field === 'phone'){
      this.infos.phone = join
    }
    this.setState({ btnDisabled: false })
  }

  createInfos(){
    const {user} = this.state
    const obj = {
      avatar: null,
      bio: null,
      birthday: user.birthday.split('T')[0],
      createdAt: user.createdAt.split('T')[0],
      email: user.email,
      firstname: user.firstname,
      id: user.id,
      lastname: user.lastname,
      paypal: null,
      phone: user.phone,
      type: user.type,
      updateAt: user.updateAt
    }
    this.setState({ user: obj })
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ longitude: position.coords.longitude, latitude: position.coords.latitude })
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  updateInfos = async (): Promise<void | never> => {
    const date = JSON.stringify(this.infos.birthday)
/*     if (!this.testDate(date)){
      alert('Format de date invalide!')
    } else { */
      const { token, user } = this.state
      return fetch(`https://eazybiff-server.herokuapp.com/api/users/${user.id}`, {
        method: 'PUT',
        headers: 
        new Headers({
          'Authorization': token.toString(), 
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(this.infos)
      })
        .then((response) => response.json())
        .then((json) => {
          const obj: Infos = {
            birthday: json.data.user.birthday.split('T')[0],
            lastname: json.data.user.lastname,
            firstname: json.data.user.firstname,
            bio: json.data.user.bio,
            phone: json.data.user.phone
          }
          this.setState({ data: obj, btnDisabled: true })
          console.log(`Successfully inserted object ${JSON.stringify(this.infos)}`)
        })
        .catch((error) => {
          console.error(error);
        });
    //}
  }

  testDate = (date: string) => {
    if(!moment(date, "YYYY-MM-DD", true).isValid()){
      return false
    } else {
      return true
    }
  }

  render() {

    const { longitude, latitude, user } = this.state

    console.log(user)

    return (
      <View style={styles.view}>
        <View>
        <Image style={style.avatar} source={require('./avatar.png')}/>
          <Text style={styles.title}>Profile</Text>
          <View>

            <Input
              label='Lastname'
              defaultValue={user.lastname} 
              onChangeText={text => this.handleChange('lastname', text)}
            />
            <Input
              label='Firstname'
              defaultValue={user.firstname}
              onChangeText={text => this.handleChange('firstname', text)}
            />
            <Input
              label='Birthday'
              defaultValue={user.birthday} 
              onChangeText={text => this.handleChange('birthday', text)}
              maxLength={10}
            />
            <Input
              label='Bio'
              defaultValue={user.bio} 
              onChangeText={text => this.handleChange('bio', text)}
              maxLength={10}
            />
            <Input
              label='Phone'
              defaultValue={user.phone}
              onChangeText={text => this.handleChange('phone', text)}
              maxLength={10}
            />

          </View>
          <Button
            title="Save"
            type="clear"
            disabled={this.state.btnDisabled}
            onPress={() => this.updateInfos()}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text>Localisation : {latitude},  {longitude}</Text>
          <TouchableOpacity activeOpacity = { .5 } onPress={this.handleReload}>
            <Image style={style.img} source={require('./settings.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <Text>Vous êtes inscrit depuis le : {user.createdAt}</Text>
        </View>
      </View>
    );

  }

}