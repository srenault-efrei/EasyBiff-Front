import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import { Icon, Button, normalize } from 'react-native-elements'
import {  SafeAreaView, View, TextInput, Text, Image, Picker, TouchableOpacity, AsyncStorage,FlatList } from 'react-native';
import styles from '../../assets/css/styles'
import MyHeader from './MyHeader'


export interface Props {
  token:string,
  id:string
  route:any
  params:any
  navigation: NavigationScreenProp<any>
}

interface State {
  searchFilter:any
  services:any
  servicesSearched:any
  initialServices:any
}



export default class Services extends React.Component<Props, State> {

  state = { searchFilter: 'name',services : [],servicesSearched:"",initialServices : []}

  async fetchServices(){
   
    const res : any = await fetch('https://eazybiff-server.herokuapp.com/api/services/').then((response)=> {
      return response.json()
    }) 
    if(res != undefined){
      const services = Object.values(res['data'])[0]
      this.setState({services,initialServices:services})
    }
  
    

  }

  async checkToken(){
    const token =await AsyncStorage.getItem("token")
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
        const services = this.state.services.filter((service) => {
            if (String(service[filter]).toLowerCase().includes(String(text))) {
                return service
            }
        })
        this.setState({ services })
    }
}
sortList() {
    const input_type = this.state.searchFilter
    console.log(input_type);

    let services = this.state.services
    if (input_type === 'id') {
        services = services.sort((a, b) => a[input_type] - b[input_type])
    }
    else if (input_type === 'types') {
        services = services.sort((a, b) => {

            if (a[input_type][0] < b[input_type][0]) {
                return -1
            } if (a[input_type][0] > b[input_type][0]) { return 1 } return 0
        })
    }
    else {
        services = services.sort((a, b) => {
            if (a[input_type] < b[input_type]) {
                return -1
            } if (a[input_type] > b[input_type]) { return 1 } return 0
        })
    }

    this.setState({ services })

}

async updateFilterParam(searchFilter:string) {
    await this.setState({ searchFilter })
    this.sortList()
}
  

  displayServices() {
   
    
   
    //console.log('avant',this.state.services[0],typeof this.state.services[0] =="undefined");
    
    
    // if (this.state.services.length > 0){
    //     console.log('apres',this.state.services.map((service)=>{console.log("ok",service);
    //     }));
        
    //     return (
    //         <FlatList<any>
    //             data={this.state.services}
    //             renderItem={({ item }) => <View style={styles.card} key={item["id"]} >
    //                 <TouchableOpacity onPress={() => { this.props.navigation.navigate('TODO') }}>
    //                 </TouchableOpacity>
    //                 <Button title={item["id"]} buttonStyle={{ width: '100%', borderWidth: 0, backgroundColor: 'transparent' }} titleStyle={{ color: 'rgb(250,90,86)', textTransform: 'capitalize' }} onPress={() => { this.props.navigation.navigate('') }} />
    //             </View>}
    //             keyExtractor={item => String(item.id)}
    //             onEndReached={() => {
    //                 if (this.state.servicesSearched==='') {
    //                     classThis.fetchServices()
    //                 }

    //             }}
    //             onEndReachedThreshold={0.5}
    //         />
    //     )
    // }
}

render() {

    return (
        <SafeAreaView>

            <MyHeader navigation={this.props.navigation} name="Services"></MyHeader>
            <View style={styles.inputRow}>

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
                    <Picker.Item label="Nom" value="name" />
                    <Picker.Item label="Type" value="types" />
                    <Picker.Item label="Numero" value="id" />
                </Picker>
                <TextInput placeholder='Taper votre recherche ici ' style={styles.input} onChangeText={(text) => { this.searchMatchedServices(text) }}></TextInput>
            </View>
            <Text>Services Presta</Text>
            {this.displayServices()}
        </SafeAreaView>

    )
}
}