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
import { RouteComponentProps } from "react-router-dom";

interface Props {
  navigation: NavigationScreenProp<any>,
  route: RouteComponentProps
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
            <Text style={[styles.bottomView, {fontStyle: 'italic'}]}>Membre depuis le {user.inscription}.</Text>
          </View>
        </Card>
        </View>
      </View>
    );

  }

}