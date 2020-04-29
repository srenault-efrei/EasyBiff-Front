import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    SafeAreaView,
    View,
    Text
} from 'react-native';
import styles from '../../assets/css/styles'

export enum UserType {
    PROVIDER = "provider",
    CUSTOMER = "customer"
}

export interface Props {
    navigation: NavigationScreenProp<any>;
    route: any;
    data: any;
    UserType: UserType;
}

interface State {
    error: string
}

export default class SignUp extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props)

        this.state = {
            error: ''
        }
    }

    componentDidMount() {
    }

    goTo(page: string, params: object = {}) {
        this.props.navigation.navigate(page, params)
    }

    setType(type: string) {
        fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.props.data.user.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.data.meta.token
            },
            body: JSON.stringify({ 
                firstname: this.props.data.user.firstname,
                lastname: this.props.data.user.lastname,
                birthday: this.props.data.user.birthday,
                bio: 'Pas de biographie',
                type,

             })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson['err']) {
                    this.setState({ error: responseJson.err.description })
                }
                else {
                    if (type === UserType.CUSTOMER) {
                        this.goTo('ServicesCusto', { data: responseJson.data })
                    }
                    else if (type === UserType.PROVIDER) {
                        this.goTo('Services', { data: responseJson.data })
                    }

                }
            })
            .catch((error) => {
                this.setState({ error })
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topView}>
                    <Text style={styles.title}>EazyBiff</Text>
                </View>
                <View style={styles.loginView}>
                    <Text>Vous souhaitez ?</Text>
                </View>
                <View style={styles.loginView}>
                    <View style={styles.button}>
                        <Text style={styles.textButton} onPress={() => this.setType(UserType.PROVIDER)}>Rendre service</Text>
                    </View>
                    <View style={styles.button}>
                        <Text style={styles.textButton} onPress={() => this.setType(UserType.CUSTOMER)}>Obtenir un service</Text>
                    </View>
                </View>
            </SafeAreaView >
        );
    }

}
