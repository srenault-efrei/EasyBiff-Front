import React, { Component } from 'react';
import moment from 'moment'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
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
  userId: string,
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
        bio: '',
        phone: '',
      },
      longitude: 0,
      latitude: 0,
      userId: this.props.route.params.id,
      token: this.props.route.params.token,
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
    this.getProfile()
    this.getLocation()
    console.log(this.props.route.params)
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

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ longitude: position.coords.longitude, latitude: position.coords.latitude })
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getProfile = async (): Promise<void | never> => {
    const { token, userId } = this.state
    console.log('id: ' + userId + ', ' + 'token: ' + token)
    return fetch(`https://eazybiff-server.herokuapp.com/api/users/${userId}`, {
      method: 'GET',
      headers: 
      new Headers({
        'Authorization': token.toString(), 
        'Content-Type': 'application/json'
      })
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
        this.setState({ data: obj })
        this.infos = obj
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateInfos = async (): Promise<void | never> => {
    const date = JSON.stringify(this.infos.birthday)
/*     if (!this.testDate(date)){
      alert('Format de date invalide!')
    } else { */
      const { token, userId } = this.state
      return fetch(`https://eazybiff-server.herokuapp.com/api/users/${userId}`, {
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

    const { data, longitude, latitude } = this.state

    return (
      <View style={styles.view}>
        <View>
        <Image style={style.avatar} source={require('./avatar.png')}/>
          <Text style={styles.title}>Profile</Text>
          <View>

            <Input
              defaultValue={data.lastname} 
              onChangeText={text => this.handleChange('lastname', text)}
            />
            <Input
              defaultValue={data.firstname}
              onChangeText={text => this.handleChange('firstname', text)}
            />
            <Input
              defaultValue={data.birthday} 
              onChangeText={text => this.handleChange('birthday', text)}
              maxLength={10}
            />
            <Input
              defaultValue={data.bio} 
              onChangeText={text => this.handleChange('bio', text)}
              maxLength={10}
            />
            <Input
              defaultValue={data.phone}
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
                    <Text>Vous êtes inscrit depuis le : 16 avril 2020</Text>
        </View>
      </View>
    );

  }

}