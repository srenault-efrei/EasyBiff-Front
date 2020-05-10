import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import { Icon, Button } from 'react-native-elements'
import {  SafeAreaView, View, TextInput, ScrollView, Text, Picker, TouchableOpacity, AsyncStorage,FlatList } from 'react-native';
import styles from '../../assets/css/services'
import MyHeader from './MyHeader'
import  {isNull} from 'lodash'


export interface Props {
  token:string,
  id:string
  route:object
  params:any
  navigation: NavigationScreenProp<any>
}

export interface IService {
    category: object
    city: string
    dateDebut: string
    dateFin: string
    description:string
    id: number
    postalCode: number
    state:number
    price: number
    radius: object
    user:object

}
export interface IResService{
    service:Array<IService>
}

export interface IResData{
    data:IResService
}

interface State {
  searchFilter:string
  services:Array<IService>
  servicesSearched:string
  initialServices:Array<IService>
}

export default class ServicesCusto extends React.Component<Props, State> {

  state = { searchFilter: 'category',services : [],servicesSearched:"",initialServices : []}

  async fetchServices(){
      const res = await fetch(`https://eazybiff-server.herokuapp.com/api/services/`)
      const jsonRes : IResData = await res.json()
      let allServices = await Object.values(jsonRes.data.service)
      const services= allServices.filter((s)=>{return s.state!=-1})
      this.setState({services,initialServices:services})
  }

  async checkToken(){
    const token = await AsyncStorage.getItem('token')
    if(!token){
     this.props.navigation.navigate('Connexion')
    }
  }

  componentDidMount(){
      this.checkToken()
      this.fetchServices()

  }

  searchMatchedServices(text:any) {
    const filter = String(this.state.searchFilter)
    this.setState({ servicesSearched: text })
    text = String(text).toLowerCase()
    if (text == '') {
        this.setState({ services: this.state.initialServices })
    }
    else {
          const services = this.state.services.filter((service:any) => {
            if(filter=='category'){
                if (String(service.category.name).toLowerCase().includes(String(text))) {
                    return service
                }
            }
            else if(filter == 'desc'){
                if (String(service.description).toLowerCase().includes(String(text))) {
                    return service
                }
            }
        })
        this.setState({ services })
    }
}

getUserFirstname(item:any) {
    
    
    return isNull(item) ? "Sans User" :item.firstname
}


async updateFilterParam(searchFilter:string) {
    await this.setState({ searchFilter })
}

  displayServices() {
    const classThis = this
    if (this.state.services.length > 0) {

        return (
            <FlatList<any>
                data={this.state.services}
                renderItem={({ item }) => 
                <View style={{width:"100%"}}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Details service',{service:item})}>
                            <View>
                                <Text style={{ fontSize: 15,fontWeight:'bold'}} >{item.category.name} </Text >
                                <Text style={{ fontSize: 15 }} >{this.getUserFirstname(item.user)} </Text >
                            </View>
                            <Text style={{ fontSize: 15 }} >{item.price}€ </Text >
                            <Text style={{ fontSize: 15 }} >{converTimeStrToFrench(item.dateDebut)} </Text >
                            
                        </TouchableOpacity>
                    </View>
                </View>
                
                }
                keyExtractor={item => String(item.id)}
            />
        )
    }
}

render() {

    return (
        <SafeAreaView >
            <MyHeader navigation={this.props.navigation} name="Services"></MyHeader>
            <View style={styles.researchContainer}>
                <TextInput placeholder='Taper votre recherche ici' style={styles.inputResearch} onChangeText={(text) => { this.searchMatchedServices(text) }}></TextInput>
                <Icon
                    reverse
                    name='filter'
                    type='font-awesome'
                    color="black"
                    size={15}
                />
                <Picker
                    selectedValue={this.state.searchFilter}
                    style={{ height: 50, width: 110 }}
                    mode='dialog'
                    onValueChange={(itemValue, itemIndex) => {
                        this.updateFilterParam(itemValue)
                    }
                    }>
                    <Picker.Item label="Categorie" value="category" />
                    <Picker.Item label="Description" value="desc" />
                </Picker>
            </View>
            {this.displayServices()}
        </SafeAreaView>

    )
}
}

export function converTimeStrToFrench(time:string){

    return time.slice(0,10)
    
}