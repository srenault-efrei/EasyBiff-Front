import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import styles from '../../assets/css/services'
import MyHeader from './MyHeader'
import Moment from 'react-moment';
import { ScrollView } from 'react-native-gesture-handler';



export interface Props {
  token: string,
  id: string
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
    this.unsubscribe()
  }

  unsubscribe = (): void => {
    this.props.navigation.addListener('focus', () => {
      this.fetchServices()
    })
  }

  async setDataStorage(): Promise<void | never> {
    let user = await AsyncStorage.getItem('user')
    let token = await AsyncStorage.getItem('token')
    if (!user) {
      this.props.navigation.navigate("Connexion")
    } else if (user && token) {
      if(JSON.parse(user).type=="customer"){
        this.props.navigation.navigate('ServicesCusto')
      }
      this.setState({
        user: JSON.parse(user),
        token
      })
    }
  }


  componentWillUnmount() {
    this.unsubscribe();
  }

  goTo = (page: string, service?: number, user?: string, token?: string): void => {
    this.props.navigation.navigate(page, { serviceId: service, user: user, token: token })
  }


  fetchServices = async (): Promise<void | never> => {

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
          services: json["data"]["user"][0]["services"]
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changeDate = (str: string): string => {

    let date: Date = new Date(str)

    return `${("0" + (date.getDate())).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`

  }


  

  render() {
    return (
      <SafeAreaView>
        <MyHeader navigation={this.props.navigation} name="Services" ></MyHeader>

        <TouchableOpacity
          onPress={() => this.goTo('AddService', 1, this.state.user.id, this.state.token)}
        >
          <Text style={styles.addService} > + Ajouter un service </Text >
        </TouchableOpacity>

        <ScrollView>
          {this.state.services.map((service, i) => (

            <View key={i} style={styles.viewServiceAsk} >
              {/* <Moment format="DD/MM/YYYY">{service.dateDebut}</Moment> */}

              {service.state == 1 ?
                <View style={styles.viewService}>
                  <TouchableOpacity
                    onPress={() => this.goTo('EditService', service.id, this.state.user.id, this.state.token)}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }} > {service["category"].name} du {this.changeDate(service.dateDebut)} </Text >
                  </TouchableOpacity>
                </View>
                : <View></View>
              }

            </View>


          ))
          }

        </ScrollView>

        <View style={styles.loginView}>
        </View>


      </SafeAreaView>
    );

  }
}