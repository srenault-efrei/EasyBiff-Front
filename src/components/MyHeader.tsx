import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { View, AsyncStorage } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import styles from '../../assets/css/styles'

export interface Props {
  navigation: any
  name: any
}


export default class MyHeader extends React.Component<Props> {



  logout() {
    this.props.navigation.navigate('Connexion')
  }

  toggleRightIcons() {
    return (<View style={{ flexDirection: 'row' }}>
      <Icon
        name='home'
        type='Entypo'
        color='#fff'
        onPress={() => this.props.navigation.navigate(('Services'))} />
      <Icon
        name='logout'
        type='material-community'
        color='white'
        containerStyle={{ marginLeft: 20 }}
        onPress={() => { this.logout() }} />
    </View>)

  }
  render() {

    return (

      <Header
        leftComponent={<Icon
          name='menu'
          type='Entypo'
          color='white'
          onPress={() => this.props.navigation.toggleDrawer()}
        />}
        centerComponent={{ text: this.props.name, style: { color: 'white', fontSize: 30} }}
        rightComponent={this.toggleRightIcons()}
        containerStyle={styles.header}
      />

    )
  }
}
