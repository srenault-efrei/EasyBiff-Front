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
    isConnected: boolean
}

export default class SplashScreen extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props)

        this.state = {
            token: '',
            user: {},
            isConnected: true
        }
    }

    async componentDidMount() {
        await this.getToken();
        await this.getUser();
        this.timer();
    }

    async getToken() {
        const token = await AsyncStorage.getItem('token');
        if (token && token !== undefined) {
            this.setState({ token });
        } else {
            this.setState({ isConnected: false })
        }
    }

    async getUser() {
        const user = await AsyncStorage.getItem('user');
        if (user && user !== undefined) {
            this.setState({ user: JSON.parse(user) });
        } else {
            this.setState({ isConnected: false })
        }
    }

    timer() {
        const ctrl = this;
        setTimeout(function () {
            ctrl.screenChoice();
        }, 2000);
    }

    screenChoice() {
        if (this.state.isConnected) {
            if (this.state.user.type === UserType.CUSTOMER) {
                this.props.navigation.navigate('ServicesCusto');
            } else if (this.state.user.type === UserType.PROVIDER) {
                this.props.navigation.navigate('Services');
            } else {
                this.props.navigation.navigate('Preference');
            }
        } else {
            this.props.navigation.navigate('Connexion');
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.view}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/eazy-biff-logo.png')}
                    />
                </View>
            </SafeAreaView >
        );
    }

}
