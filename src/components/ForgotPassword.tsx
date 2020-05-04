import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    SafeAreaView,
    View,
    Text, TextInput

} from 'react-native';
import styles from '../../assets/css/styles'


export interface Props {
}

interface State {

}

export default class SplashScreen extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props)
    }

    pressButton() : void {
console.log("hello")
    }
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.view}>
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder="Numéro de téléphone"
                    />
                </View>
                <View style={styles.bottomView}>
                        <Text onPress={() => this.pressButton( )}>Valider</Text>
                    </View>

            </SafeAreaView >
        );
    }

}
