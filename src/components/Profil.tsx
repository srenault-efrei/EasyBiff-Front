import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../assets/css/styles'

export default class Profile extends Component {

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>Profile</Text>
      </View>
    );

  }

}