import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    AsyncStorage,
    Image
} from 'react-native';
import styles from '../../assets/css/styles'

export enum UserType {
    PROVIDER = "provider",
    CUSTOMER = "customer"
}

export interface Props {
    navigation: NavigationScreenProp<any>
    UserType: UserType;
}

interface State {
    email: string,
    password: string,
    error: string;

}

export default class Signin extends React.Component<Props, State>{

    constructor(props: any) {
        super(props)
        
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    _storeData = async (token: string, user: object) => {
        try {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.log(error);
        }

    };

    goTo = (page: string) => {
        this.props.navigation.navigate(page)
    }

    async signIn() {
        const req = await fetch('https://eazybiff-server.herokuapp.com/api/authenticate/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.email.trim(), password: this.state.password.trim() })
        })
        const json =await req.json()
        if (json.err) {
            this.setState({ error: json.err.description })
        }
        else {
            await this._storeData(json.data.meta.token, json.data.user)
            if (json.data.user.type === UserType.CUSTOMER) {
                this.props.navigation.navigate('ServicesCusto');
            } else if (json.data.user.type === UserType.PROVIDER) {
                this.props.navigation.navigate('Services');
            } else {
                this.props.navigation.navigate('Preference');
            }
        }
    }

    // async componentDidMount(){
    //     const response = await fetch('https://eazybiff-server.herokuapp.com/api/services/')
    //     const services = response.json()
    //     console.log("services",services);
    // }




    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topView}>
                    <Image
                        style={styles.headerLogo}
                        source={require('../../assets/eazy-biff-logo.png')}
                    />
                </View>
                <View style={styles.loginView}>
                    <TextInput
                        // name="email"
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                    >
                    </TextInput>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                    >
                    </TextInput>
                    <Text style={styles.error}>{this.state.error}</Text>
                    <View style={{ width: "100%", marginBottom: 5, flexDirection: "row-reverse" }}>
                        <Text onPress={() => this.goTo('ForgotPassword')}>Mot de passe oublié</Text>
                    </View>
                    <View style={styles.button}>
                        <Text style={styles.textButton} onPress={() => this.signIn()}>Connexion</Text>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text onPress={() => this.props.navigation.navigate('Inscription')}>Pas encore inscrit ? Clique ici !</Text>
                </View>
            </SafeAreaView>
        );
    }

}