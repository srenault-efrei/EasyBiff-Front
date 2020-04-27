import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    SafeAreaView,
    View,
    Text,
    TextInput
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import styles from '../../assets/css/styles'


export interface Props {
    navigation: NavigationScreenProp<any>
}

interface State {
    firstname: string,
    lastname: string,
    birthday: Date | null,
    email: string,
    password: string,
    confirm_password: string,
    gender: boolean,
    phone: number,
    type: string,
    orderData: Array<{ key: number, section: boolean, label: string, value: boolean }>
}

export default class SignUp extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            birthday: null,
            email: '',
            password: '',
            confirm_password: '',
            gender: true,
            phone: 0,
            type: '',
            orderData: [
                { key: 1, section: true, label: 'Homme', value: true },
                { key: 2, section: false, label: 'Femme', value: false }
            ],
        };
    }

    goTo(page: string, params: object = {}) {
        this.props.navigation.navigate(page, params)
    }

    signUp() {
        fetch('http://localhost:4242/api/authenticate/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                this.goTo('Services', responseJson.data.user);

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topView}>
                    <Text style={styles.title}>EazyBiff</Text>
                </View>
                <View style={styles.loginView}>
                    <ModalSelector
                        data={this.state.orderData}
                        onChange={(option) => { this.setState({ gender: option.value }) }}
                        style={{width: '100%'}}>
                        <TextInput
                            autoCapitalize='none'
                            style={styles.input}
                            placeholder="Genre (Binaire)"
                            value={this.state.gender ? 'Homme' : 'Femme'} />
                    </ModalSelector>
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder="Prénom"
                        onChangeText={firstname => this.setState({ firstname })}
                    />
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder="Nom"
                        onChangeText={lastname => this.setState({ lastname })}
                    />
                    <TextInput
                        caretHidden
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                    />
                    <View style={styles.button}>
                        <Text style={styles.textButton} onPress={() => this.signUp()}>S'inscrire</Text>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text onPress={() => this.goTo('Connexion')}>Déjà inscrit ? Clique ici !</Text>
                </View>
            </SafeAreaView>
        );
    }

}
