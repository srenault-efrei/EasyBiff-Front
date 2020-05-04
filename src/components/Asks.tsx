import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    AsyncStorage

} from 'react-native';
import MyHeader from './MyHeader'
import styles from '../../assets/css/ask'
import { Icon } from 'react-native-elements';


export interface Props {
    navigation: NavigationScreenProp<any>
    token: string,
    route: any
    params: any

}

interface State {
    user: any
    token: string
    asks: Array<any>
    tabClick: Array<number>
}

export default class Service extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            user: {},
            token: '',
            asks: [],
            tabClick: [-1]
        }
    }

    async  componentDidMount() {
        await this.setDataStorage()
        this.fetchAsks()
    }




    async setDataStorage(): Promise<void | never> {
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



    fetchAsks = async (): Promise<void | never> => {
        return fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.state.user.id}/asks`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': this.state.token,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    asks: json.data["ask"]
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

    updateAsk = (state: number, idService: number): Promise<void | never> => {

        return fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.state.user.id}/asks/${idService}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': this.state.token,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                state: state
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.data == null || json.data == undefined) {
                    console.log(json.err.description)
                } else {
                    let tab: Array<number> = this.state.tabClick
                    tab.push(idService)
                    this.setState({
                        tabClick: tab
                    })
                    this.fetchAsks()
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
console.log(this.state.asks)
        return (
            <SafeAreaView style={styles.viewPage} >
                <MyHeader navigation={this.props.navigation} name="Demandes" ></MyHeader>
                <ScrollView>
                    {
                        this.state.asks.map((ask, idAsk) => (
                            <View key={idAsk} style={{ flexDirection: "row" }}>
                                {ask.state === 1
                                    ?
                                    <View style={styles.viewServiceAsk} >
                                        <View style={styles.viewAsk}>
                                            <View>
                                                <Text style={{ fontSize: 15 }} > Demande de
                                                <Text style={styles.textUnderline}
                                                        onPress={() => this.props.navigation.navigate('Profil', { user: ask.customer })}
                                                    > {ask.customer.firstname} </Text>
                                                  pour le service de
                                                  <Text style={styles.textUnderline}
                                                        onPress={() => this.props.navigation.navigate('Details service', { service: ask.service })}
                                                    > {ask.service.category.name} </Text>
                                                    du {this.changeDate(ask.service.dateDebut)}.
                                                    </Text >
                                            </View>
                                        </View>
                                        {this.state.tabClick.includes(ask.service.id) ?
                                            <View style={{ flexDirection: "row" }}>
                                            </View>
                                            :
                                            <View style={{ flexDirection: "row" }}>
                                                <Icon
                                                    name='check'
                                                    type='material'
                                                    color='green'

                                                    iconStyle={{ fontSize: 35, display: "flex" }}
                                                    containerStyle={{ marginLeft: 20, justifyContent: "center", paddingRight: 20 }}
                                                    onPress={() => { this.updateAsk(2, ask.service.id) }}
                                                />
                                                <Icon
                                                    name='close'
                                                    type='material'
                                                    color='red'

                                                    iconStyle={{ fontSize: 35, display: "flex" }}
                                                    containerStyle={{ marginLeft: 20, justifyContent: "center", paddingRight: 20 }}
                                                    onPress={() => { this.updateAsk(-1, ask.service.id) }}
                                                />
                                            </View>
                                        }
                                    </View>
                                    :
                                    ask.state === -1
                                        ?
                                        <View style={styles.viewServiceAsk} >
                                            <View style={styles.viewRefusedAsk}>
                                                <View>
                                                    <Text style={{ fontSize: 15 }} > Vous avez refusé la demande de
                                                    <Text style={styles.textUnderline}
                                                            onPress={() => this.props.navigation.navigate('Profil', { user: ask.customer })}
                                                        > {ask.customer.firstname} </Text>
                                                    pour le service
                                                    <Text style={styles.textUnderline}
                                                            onPress={() => this.props.navigation.navigate('Details service', { service: ask.service })}
                                                        > {ask.service.category.name} </Text>
                                                    du {this.changeDate(ask.service.dateDebut)}.
                                                    </Text >
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        ask.service.state === 2
                                            ?
                                            <View style={styles.viewServiceAsk} >
                                                <View style={styles.viewValidAsk}>
                                                    <View>
                                                        <Text style={{ fontSize: 15 }} >Le service
                                                        <Text style={styles.textUnderline}
                                                                onPress={() => this.props.navigation.navigate('Details service', { service: ask.service })}
                                                            > {ask.service.category.name} </Text>
                                                         du {this.changeDate(ask.service.dateDebut)} a été payé par
                                                        <Text style={styles.textUnderline}
                                                                onPress={() => this.props.navigation.navigate('Profil', { user: ask.customer })}
                                                            > {ask.customer.firstname}.</Text>
                                                        </Text >
                                                    </View>
                                                </View>
                                            </View>
                                            :
                                            <View style={styles.viewServiceAsk} >
                                                <View style={styles.viewValidAsk}>
                                                    <View>
                                                        <Text style={{ fontSize: 15 }} > Vous avez validé la demande de
                                                        <Text style={styles.textUnderline}
                                                                onPress={() => this.props.navigation.navigate('Profil', { user: ask.customer })}
                                                            > {ask.customer.firstname} </Text>
                                                          pour le service
                                                          <Text style={styles.textUnderline}
                                                                onPress={() => this.props.navigation.navigate('Details service', { service: ask.service })}
                                                            > {ask.service.category.name} </Text>
                                                            du {this.changeDate(ask.service.dateDebut)}.
                                                            </Text >
                                                    </View>
                                                </View>
                                            </View>
                                }
                            </View>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        );

    }
}