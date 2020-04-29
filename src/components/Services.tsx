import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import styles from '../../assets/css/styles'
import MyHeader from './MyHeader'


export interface Props {
  token: string,
  id: string
  isEdit: boolean
  route: any
  params: any
  navigation: NavigationScreenProp<any>
}



interface State {

  services: Array<any>
  user: any
  token: string
}

export default class Service extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      services: [],
      user: {},
      token: ''
    }
  }


  async  componentDidMount() {
    await this.setDataStorage()
    this.fetchServices()
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

  // permet de mettre a jour les states auto mais rend l'appli lente 
  // componentDidUpdate() {
  //   this.fetchServices()
  // }


  goTo = (page: string, service?: number, user?: string, token?: string) => {
    this.props.navigation.navigate(page, { serviceId: service, user: user, token: token })
  }


  fetchServices = async (): Promise<void | never> => {


    console.log(this.state.user)
    console.log(this.state.token)

    return fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.state.user.id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': this.state.token,
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

    // console.log(this.state.services)
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
                  onPress={() => this.goTo('EditService', service.id, this.state.user.id, this.state.token)}
                >
                  <Text style={{ fontSize: 15 }} >{service.id} / name</Text >
                </TouchableOpacity>
              </View> : <View></View>}
          </View>
        ))
        }

        <TouchableOpacity
          onPress={() => this.goTo('AddService', 1, this.state.user.id, this.state.token)}
        >
          <Text style={{ fontSize: 15, color: "green", marginTop: 20, fontWeight: "bold" }} >Ajouter un service </Text >
        </TouchableOpacity>

        <View style={styles.loginView}>
        </View>


      </SafeAreaView>
    );

  }
}