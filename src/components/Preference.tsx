import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    SafeAreaView,
    View,
    Text,
    AsyncStorage
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
    user: object,
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

    componentDidMount() {
        this.getToken();
        this.getUser();
    }

    async getToken() {
        const token = await AsyncStorage.getItem('token');
        if (token && token !== undefined) {
            console.log('PRE-TOKEN : ', token);
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
            console.log('PRE-USER : ', user);
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

    setType(type: string) {
        fetch(`http://127.0.0.1:4242/api/users/${this.state.user.id}`, {
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
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson['err']) {
                    this.setState({ error: responseJson.err.description })
                }
                else {
                    console.log(responseJson);
                    this._storeData(responseJson.data.meta.token, responseJson.data.user)
                    if (type === UserType.CUSTOMER) {
                        this.props.navigation.navigate('ServicesCusto');
                    }
                    else if (type === UserType.PROVIDER) {
                        this.props.navigation.navigate('Services');
                    }

                }
            })
            .catch((error) => {
                this.setState({ error })
            });
    }

    _storeData = async (token: string, user: object) => {
        try {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.log('Local storage data Error : ', error)
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topView}>
                    <Text style={styles.title}>EazyBiff</Text>
                </View>
                <View style={styles.loginView}>
                    <Text style={{ fontSize: 24, marginBottom: 20 }}>Vous souhaitez ?</Text>
                    <View style={{ flexDirection: "row"}}>
                        <View style={styles.halfButton}>
                            <Text style={styles.textButton} onPress={() => this.setType(UserType.PROVIDER)}>Rendre service</Text>
                        </View>
                        <View style={styles.halfButton}>
                            <Text style={styles.textButton} onPress={() => this.setType(UserType.CUSTOMER)}>Obtenir un service</Text>
                        </View>
                    </View>
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
            </SafeAreaView >
        );
    }

}
