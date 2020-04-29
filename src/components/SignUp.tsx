import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
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
    passwordConfirmation: string,
    phone: string,
    type: string,
    error: string
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
            passwordConfirmation: '',
            phone: '',
            type: '',
            error: ''
        };
    }

    isSamePasswords(password: string, passwordConfirmation: string): boolean {
        return (password.trim() === passwordConfirmation.trim()) ? true : false;
    }

    _storeData = async (token: string, user: object) => {
        try {
            

        } catch(error) {
            console.log('Storage data Error : ', error)
        }
    }

    signUp() {
        if (this.isSamePasswords(this.state.password, this.state.passwordConfirmation)) {

            fetch('http://eazybiff-server.herokuapp.com/api/authenticate/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: this.state.firstname.trim(),
                    lastname: this.state.lastname.trim(),
                    birthday: this.state.birthday,
                    email: this.state.email.trim(),
                    password: this.state.password.trim(),
                    passwordConfirmation: this.state.passwordConfirmation.trim(),
                    phone: this.state.phone.trim(),
                    gender: true,
                    type: "provider"
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson['err']) {
                        this.setState({ error: responseJson.err.description })
                    } else {
                        console.log(responseJson);

                        this.props.navigation.navigate('Preference');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this.setState({ error: 'Attention,\nLes mots de passe saisis ne correspondent pas' });
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topView}>
                    <Text style={styles.title}>EazyBiff</Text>
                </View>
                <View style={styles.loginView}>
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
                    <DatePicker
                        style={styles.input}
                        date={this.state.birthday}
                        mode="date"
                        placeholder="Date de naissance"
                        format="YYYY-MM-DD"
                        minDate="1900-01-01"
                        maxDate={moment(new Date()).format('YYYY-MM-DD')}
                        confirmBtnText="Valider"
                        cancelBtnText="Annuler"
                        customStyles={{
                            dateIcon: styles.dateIcon,
                            dateInput: styles.dateInput
                        }}
                        onDateChange={(birthday: Date | null) => { this.setState({ birthday }) }}
                    />
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder="Numéro de téléphone"
                        onChangeText={phone => this.setState({ phone })}
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
                        placeholder="Mot de passe"
                        onChangeText={password => this.setState({ password })}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder="Confirmation du mot de passe"
                        onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                    />
                    <Text style={styles.error}>{this.state.error}</Text>
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
