import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,

} from 'react-native';
import styles from '../../assets/css/styles'


export interface Props {
    navigation: NavigationScreenProp<any>
}

interface State {
    phone: string
    error: string
    isDisplay: boolean
}

export default class Signin extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props)

        this.state = {
            phone: '',
            error: '',
            isDisplay: false
        }

    }


    goTo = (page: string): void => {
        this.props.navigation.navigate(page)
    }

    updatePhone = async (): Promise<void | never> => {

        if (this.state.phone === '') {
            this.setState({
                error: 'Entrez votre numéro de téléphone',
                isDisplay: true
            })
        } else {
            return fetch(`https://eazybiff-server.herokuapp.com/api/forgotPassword/${this.state.phone}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.data != null || json.data != undefined) {
                        this.setState({
                            isDisplay: false
                        })
                        this.goTo('Connexion')
                    } else {
                        this.setState({
                            error: json.err.description,
                            isDisplay: true
                        })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }


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
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder="Numéro de téléphone"
                        maxLength={10}
                        onChangeText={phone => this.setState({ phone })}
                    >
                    </TextInput>
                    {this.state.isDisplay ? <Text style={styles.error}>{this.state.error}</Text> : <Text></Text>}
                    <View style={styles.button}>
                        <Text style={styles.textButton} onPress={() => this.updatePhone()} >Valider</Text>
                    </View>
                    <View style={styles.buttonPassword}>
                        <Text style={styles.textButton} onPress={() => this.goTo('Connexion')} >Annuler</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

}