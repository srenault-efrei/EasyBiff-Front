import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
  View,
  Text,
  SafeAreaView, TouchableOpacity
} from 'react-native';
import styles from '../../assets/css/styles'
import MyHeader from './MyHeader'


export interface Props {
  token: string,
  id: string
  route: any
  params: any
  navigation: NavigationScreenProp<any>
}

interface State {

  services: Array<any>
}

export default class Service extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      services: []
    }
  }

  componentDidMount() {
    if (!this.props.route?.params) {
      this.props.navigation.navigate('Connexion')
    }
    this.fetchServices()
  }


  goTo = (page: string, service?: number, user?: string, token?: string) => {
    this.props.navigation.navigate(page, { serviceId: service, user: user, token: token })
  }


  fetchServices = (): Promise<void | never> => {

    return fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.props.route.params.id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': this.props.route.params.token,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          services: json.data.user.services
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    console.log(this.state.services)
    return (
      <SafeAreaView style={styles.view}>
        <MyHeader navigation={this.props.navigation} name="Services" ></MyHeader>
        {/* <View style={styles.topView}>
          <Text >Services</Text>
          <Text style={{ marginLeft: 200 }}>Demandes</Text>
        </View>
        <View style={styles.line}></View> */}
        {this.state.services.map((service, i) => (

          <View key={i} >
            {service.state !== -1 ?
              <View style={styles.viewService}>
                <TouchableOpacity
                  onPress={() => this.goTo('EditService', service.id, this.props.route.params.id, this.props.route.params.token)}
                >
                  <Text style={{ fontSize: 15 }} >{service.id} / name</Text >
                </TouchableOpacity>
              </View> : <View></View>}
          </View>
        ))
        }

        <TouchableOpacity
          onPress={() => this.goTo('AddService',1,this.props.route.params.id, this.props.route.params.token)}
        >
          <Text style={{ fontSize: 15, color: "green", marginTop: 20, fontWeight: "bold"}} >Ajouter un service </Text >
        </TouchableOpacity>

        <View style={styles.loginView}>
        </View>


      </SafeAreaView>
    );

  }

}