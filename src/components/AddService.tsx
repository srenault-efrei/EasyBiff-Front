import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../assets/css/styles'

export interface Props {}

interface State {}

export default class AddService extends React.Component<Props, State> {

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>Services</Text>
      </View>
    );

  }

}