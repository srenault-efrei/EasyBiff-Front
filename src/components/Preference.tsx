import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    SafeAreaView,
    View,
    Text,
    AsyncStorage,
    Image
} from 'react-native';
import styles from '../../assets/css/styles'

export enum UserType {
    PROVIDER = "provider",
    CUSTOMER = "customer"
}

export interface Props {
    navigation: NavigationScreenProp<any>;
    UserType: UserType;
}

interface State {
    token: string,
    user: any,
    error: string
}

export default class SignUp extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props)

        this.state = {
            token: '',
            user: {},
            error: ''
        }
    }

    async componentDidMount() {
        await this.getToken();
        await this.getUser();
    }

    async getToken() {
        const token = await AsyncStorage.getItem('token');
        if (token && token !== undefined) {
            this.setState({ token });
        } else {
            this.props.navigation.navigate('Inscription', {
                error: {
                    screen: 'Preference',
                    text: 'There is no token in the local storage'
                }
            });
        }
    }

    async getUser() {
        const user = await AsyncStorage.getItem('user');
        if (user && user !== undefined) {
            this.setState({ user: JSON.parse(user) });
        } else {
            this.props.navigation.navigate('Inscription', {
                error: {
                    screen: 'Preference',
                    text: 'There is no user data in the local storage'
                }
            });
        }
    }

    async setType(type: string) {
        const req = await fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.state.user.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            },
            body: JSON.stringify({
                firstname: this.state.user.firstname,
                lastname: this.state.user.lastname,
                birthday: this.state.user.birthday,
                bio: 'Pas de biographie',
                type,
                phone: this.state.user.phone

            })
        })
        try {
            const responseJson = await req.json();

            if (responseJson.err) {
                this.setState({ error: responseJson.err.description })
                console.log(responseJson.err.description)
            }
            else {
                console.log(responseJson);
                await this._storeData(responseJson.data.user);
                if (type === UserType.CUSTOMER) {
                    this.props.navigation.navigate('ServicesCusto');
                }
                else if (type === UserType.PROVIDER) {
                    this.props.navigation.navigate('Services');
                }
            }
        } catch (error) {
            console.log(error)
            this.setState({ error })
        }
    }

    _storeData = async (user: object) => {
        try {
            await AsyncStorage.mergeItem('user', JSON.stringify(user));
        } catch (error) {
            console.log(error);
        }
    };

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
                    <Text style={{ fontSize: 24, marginBottom: 20 }}>Vous souhaitez ?</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.halfButton}>
                            <Text style={styles.textButton} onPress={() => this.setType(UserType.PROVIDER)}>Rendre service</Text>
                        </View>
                        <View style={styles.halfButton}>
                            <Text style={styles.textButton} onPress={() => this.setType(UserType.CUSTOMER)}>Obtenir un service</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView >
        );
    }

}
