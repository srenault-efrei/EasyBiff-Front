import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from '../../assets/css/styles'
import style from '../../assets/css/viewProfile'
import { NavigationScreenProp } from 'react-navigation'
import MyHeader from './MyHeader'
import { Card } from 'react-native-elements'

interface Props {
  navigation: NavigationScreenProp<any>,
  route: any
}

interface State {
  user: any,
}

export default class ProfileView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      user: this.props.route.params.user,
    };
  }

  componentDidMount(){
    this.formatUser()
  }

  formatUser() {
    const { user } = this.state
    const userUpdate = {
      id: user.id,
      lastname: user.lastname,
      firstname: user.firstname,
      age: this.getAge(user.birthday),
      inscription: user.createdAt.split('T')[0],
      biographie: user.bio,
      phone: user.phone
    }
    this.setState({ user: userUpdate })
  }

  getAge(birthday: string){
    const newBirthday = new Date(birthday);
    return new Number((new Date().getTime() - newBirthday.getTime()) / 31536000000).toFixed(0)
  }

  render() {
    const { user } = this.state
    return (
      <View style={styles.view}>
        <MyHeader navigation={this.props.navigation} name="Profil" ></MyHeader>
        <View style={styles.loginView}>
          <Card
            title={user.firstname + ' ' + user.lastname}>
            <View style={style.itemsCenter}>
              <Image style={style.avatar}
                source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
              <Text style={[style.userInfo, {marginBottom: 20, fontStyle: 'italic', fontWeight: 'bold'}]}> {user.age} ans</Text>
              { user.bio ? <Text style={[style.userInfo, style.bio, {marginBottom: 10}]}>{user.bio}</Text>: null }
              <Text style={[style.userInfo, {marginBottom: 20, fontStyle: 'italic'}]}>Contact: {user.phone}</Text>
              <Text style={[styles.bottomView, {fontStyle: 'italic'}]}>Membre depuis le {user.inscription}.</Text>
            </View>
          </Card>
        </View>
      </View>
    );
  }
}
