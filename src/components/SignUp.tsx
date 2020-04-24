import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    SafeAreaView,
    View,
    Text,
    TextInput
} from 'react-native';
import styles from '../../assets/css/styles'


export interface Props {
    navigation: NavigationScreenProp<any>
}

interface State {
    email: string,
    password: string
}

export default class SignUp extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        };
    }

    goTo = (page: string) => {
        this.props.navigation.navigate(page)
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topView}>
                    <Text style={styles.title}>EazyBiff</Text>
                </View>
                <View style={styles.loginView}>
                    <TextInput
                        caretHidden
                        // name="email"
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                    >
                    </TextInput>
                    <TextInput
                        // name="password"
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                    >
                    </TextInput>
                    <View style={styles.button}>
                        <Text onPress={() => this.goTo('Connexion')}>S'inscrire</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

}
