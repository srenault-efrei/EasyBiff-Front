import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { View, AsyncStorage } from 'react-native';
import { UserType } from './Preference';
import styles from '../../assets/css/styles';

export interface Props {
  navigation: any
  name: any
}

interface State {
  servicePage: string
}



export default class MyHeader extends React.Component<Props, State> {
  state = { servicePage: '' }

  async getUser() {
    let userData = await AsyncStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      const servicePage = user.type == UserType.PROVIDER ? "Services" : 'ServicesCusto'
      this.setState({ servicePage })

    }

  }

  componentDidMount() {
    this.getUser()
  }



  async logout() {
    try {
      const keys = await AsyncStorage.getAllKeys()
      await AsyncStorage.multiRemove(keys)
    }
    catch (err) {
      console.log('deconnexion erreur :', err);

    }
    this.props.navigation.navigate('Connexion')
  }


  toggleRightIcons() {
    return (<View style={{ flexDirection: 'row' }}>
      <Icon
        name='home'
        type='Entypo'
        color='#fff'
        onPress={() => this.props.navigation.navigate((this.state.servicePage))} />
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
        centerComponent={{ text: this.props.name, style: { color: 'white', fontSize: 30 } }}
        rightComponent={this.toggleRightIcons()}
        containerStyle={styles.header}
      />

    )
  }
}
