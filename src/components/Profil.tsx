import React, { Component } from 'react';
import moment from 'moment'
import {
  View,
  Text,
  Image,
  AsyncStorage,
} from 'react-native';
import styles from '../../assets/css/styles'
import style from '../../assets/css/profile'
import { NavigationScreenProp } from 'react-navigation'
import MyHeader from './MyHeader'
import { Form, Item, Input, Label, Textarea } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { RouteComponentProps } from "react-router-dom";
const avatar = require('../../assets/img/avatar.png')

interface Props {
  navigation: NavigationScreenProp<any>,
  route: RouteComponentProps
}

interface Infos {
  lastname: string,
  firstname: string,
  birthday: string,
  bio: string,
  phone: string,
  type: string
}

interface State {
  data: Infos,
  longitude: number,
  latitude: number,
  user: any,
  token: string,
  btnDisabled: boolean,
  chosenDate: Date
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
        type: ''
      },
      longitude: 0,
      latitude: 0,
      user: {},
      token: '',
      btnDisabled: true,
      chosenDate: new Date()
    };
    this.handleReload = this.handleReload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setDate = this.setDate.bind(this)
  }

  infos: Infos = {
    lastname: '',
    firstname: '',
    birthday: '',
    bio: '',
    phone: '',
    type: ''
  }

  async componentDidMount(){
    await this.setDataStorage()
    this.createInfos()
    this.getLocation()
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

  setDate(newDate: Date) {
    this.setState({ chosenDate: newDate });
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
      this.infos.birthday = join
    } 
    else if(field === 'bio'){
      this.infos.bio = join
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
      bio: user.bio,
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
    const infosUpdate={
      lastname: user.lastname,
      firstname: user.firstname,
      birthday: user.birthday.split('T')[0],
      bio: user.bio,
      phone: user.phone,
      type: user.type
    }
    this.setState({ user: obj })
    this.infos = infosUpdate
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
    const { token, user } = this.state
    const { navigation } = this.props
    if(!token){
      alert('Veuillez vous reconnecter.')
      this.props.navigation.navigate("Connexion")
    } else{
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
            phone: json.data.user.phone,
            type: json.data.user.type
          }
          this.setState({ data: obj, btnDisabled: true })
          if(user.type === 'customer'){
            setTimeout( () => navigation.navigate('ServicesCusto'), 3000)
          }else{
            setTimeout( () => navigation.navigate('Services'), 3000)
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const { user } = this.state
    return (
      <View style={styles.view}>
        <MyHeader navigation={this.props.navigation} name="Profil" ></MyHeader>
        <View style={styles.loginView}>
        <Image style={style.avatar} source={avatar}/>
          <Form>
            <Item stackedLabel style={style.item}>
              <Label><Icon name="info" size={15} color="#000" /> Prénom</Label>
              <Input 
                defaultValue={user.firstname}
                onChangeText={text => this.handleChange('firstname', text)}
              />
            </Item>

            <Item stackedLabel>
              <Label><Icon name="info" size={15} color="#000" /> Nom</Label>
              <Input 
                defaultValue={user.lastname}
                onChangeText={text => this.handleChange('lastname', text)}
              />
            </Item>

            <Item stackedLabel>
              <Label><Icon name="birthday-cake" size={15} color="#000" /> Date de naissance</Label>
              <Input 
                defaultValue={user.birthday}
                onChangeText={text => this.handleChange('birthday', text)}
                maxLength={10}
              />
            </Item>

            <Item stackedLabel>
              <Label><Icon name="align-right" size={15} color="#000" /> Biographie</Label>
              <Input
                defaultValue={user.bio}
                onChangeText={text => this.handleChange('bio', text)}
              />
            </Item>

            <Item stackedLabel>
              <Label><Icon name="phone" size={10} color="#000" /> Téléphone</Label>
              <Input 
                defaultValue={user.phone}
                onChangeText={text => this.handleChange('phone', text)}
                maxLength={10}
              />
            </Item>
          </Form>

          <View style={[styles.button, style.register, {marginTop: 10, backgroundColor: 'rgb(85,119,186)'}]}>
            <Text style={styles.textButton} onPress={() => this.updateInfos()}>Enregistrer</Text>
          </View>
          
        </View>
        <View style={styles.bottomView}>
          <Text>Vous êtes inscrit depuis le : <Text style={style.infos}>{user.createdAt}</Text></Text>
        </View>
      </View>
    );

  }

}