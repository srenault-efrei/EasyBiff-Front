import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../assets/css/styles'


export interface Props {
  token:string,
  id:string
  route:any
  params:any
}

interface State {}

export default class Service extends React.Component<Props, State> {
  
  
  
  render() {
    console.log(this.props.route.params)

    return (
      <View style={styles.view}>
        <Text style={styles.title}>Services</Text>
      </View>
    );

  }

}