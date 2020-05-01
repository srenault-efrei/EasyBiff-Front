import React from 'react';
import { NavigationScreenProp } from 'react-navigation'
import {
    View,
    Text,
    SafeAreaView,

} from 'react-native';
import MyHeader from './MyHeader'

export interface Props {
    navigation: NavigationScreenProp<any>
}

interface State { }

export default class Service extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
    }


    render() {

        return (
            <View>
                <MyHeader navigation={this.props.navigation} name="Services" ></MyHeader>

                <Text>Demandes</Text>
            </View>
        );

    }
}