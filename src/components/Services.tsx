import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../assets/css/styles'

export default class Service extends Component {

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>Services</Text>
      </View>
    );

  }

}