import React, { Component } from 'react';
import {
  View,
  Text,

} from 'react-native';
import styles from '../../assets/css/services'
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'
import { TextInput } from 'react-native-gesture-handler';



export interface Props { }

interface ItemsCategories{
  label: string,
  value: string
}

interface State {
  startDate: Date
  endDate: Date
  dateNow: Date
  time: string
  typeService: string
  price: number
  postalCode: number
  city: string
  radius: number
  items: Array<ItemsCategories>

}

export default class Service extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      dateNow: new Date(),
      time: new Date().getHours() + ':' + new Date().getMinutes(),
      typeService: '',
      price: 0,
      postalCode: 0,
      city: '',
      radius: 0,
      items: []

    }
  }


  componentDidMount() {
    this.fetchCategories()

  }



  transfromDate = (value: string): Date => {
    let dateSplit: Array<string> = value.split('-')
    let date: Date = new Date(dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0])
    return date
  }

  verifPrice = (value: string): void => {
    let p: number = parseInt(value)

    if (Number.isInteger(p)) {
      this.setState({ price: p })
    }
    else {
      if (value != '') {
        alert('Vous devez rentrer un nombre entier')
      }
    }
  }

  verifPostalCode = (value: string): void => {

    let code: number = parseInt(value)
    if (Number.isInteger(code)) {
      this.setState({ postalCode: code })
    }
    else {
      if (value != '') {
        alert('Vous devez rentrer un nombre entier')
      }
    }
  }

  verifCity = (value: string): void => {

    const matchNumber = value.match(/[\d]/g);
    if (matchNumber == null) {
      this.setState({ city: value })
    } else {
      alert('Votre ville ne doit pas avoir de chiffres')
    }
  }


  fetchRadius = (): Promise<void | never> => {

    return fetch('http://127.0.0.1:4242/api/categories')
      .then((response) => response.json())
      .then((json) => {
      })
      .catch((error) => {
        console.error(error);
      });
  }


  fetchCategories = (): Promise<void | never> => {

    return fetch('http://localhost:4242/api/categories')
      .then((response) => response.json())
      .then((json) => {
        let tab: Array<ItemsCategories> = []

        for (const category of json.data.category) {
          let obj: ItemsCategories = { label: category.name, value: category.name }
          tab.push(obj)
        }

        this.setState({ items: tab })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    return (
      <SafeAreaView style={styles.safeArea}>


        <View>
          <Text style={styles.label}>Choisissez un service</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Selectionner le type de service',
              value: null,
            }}
            onValueChange={(value) => this.setState({ typeService: value })}
            style={{ ...styles }}
            items={this.state.items}
          // Icon={() => {
          //   return <Ionicons name={"md-arrow-dropdown"} size={30} style={styles.dropDown} />;
          // }}
          />
        </View>

        <View style={styles.view_row}>
          <View style={styles.view}>
            <Text style={styles.label}>Date de début</Text>
            <DatePicker
              style={{ width: 150 }}
              date={this.state.startDate}
              mode="date"
              placeholder="selectionner une date"
              format="DD-MM-YYYY"
              minDate={this.state.dateNow}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: { ...styles.dateInput }
              }}
              onDateChange={(value) => { this.setState({ startDate: this.transfromDate(value) }) }}
            />
          </View>


          <View style={styles.view}>
            <Text style={styles.label}>Date de fin</Text>
            <DatePicker
              style={{ width: 150 }}
              date={this.state.endDate}
              mode="date"
              placeholder="selectionner une date"
              format="DD-MM-YYYY"
              minDate={this.state.dateNow}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: { ...styles.dateInput }
              }}
              onDateChange={(value) => { this.setState({ endDate: this.transfromDate(value) }) }}
            />
          </View>


        </View>
        <View style={styles.view_row}>
          <View style={styles.view}>
            <Text style={styles.label}>Heure</Text>
            <DatePicker
              style={{ width: 150 }}
              date={this.state.time}
              mode="time"
              placeholder="selectionner une heure"
              minDate={this.state.dateNow}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: { ...styles.dateInput }
              }}
              onDateChange={(time) => { this.setState({ time: time }) }}
            />

          </View>

          <View style={{ marginTop: 20, marginLeft: 10 }}>

            <Text style={styles.label}>Prix</Text>
            <TextInput style={styles.input}
              placeholder={"8"}
              onChangeText={value => this.verifPrice(value)}
              maxLength={2}
            >

            </TextInput>
          </View>
        </View>


        <View style={styles.view_row}>
          <View style={styles.view}>
            <Text style={styles.label}> Code postal</Text>
            <TextInput style={styles.input}
              placeholder={"94310"}
              maxLength={4}
              onChangeText={value => this.verifPostalCode(value)}
            >
            </TextInput>

          </View>

          <View style={{ marginTop: 20, marginLeft: 10 }}>
            <Text style={styles.label}>Ville</Text>
            <TextInput style={styles.input}
              placeholder={"Orly"}
              onChangeText={value => this.verifCity(value)}

            >
            </TextInput>
          </View>
        </View>

        <View style={styles.view_row}>
          <View style={styles.view}>
            <Text style={styles.label}>Rayons</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Choisir un rayon',
                value: null,
              }}
              onValueChange={(value) => this.setState({ radius: value })}
              style={{ ...styles }}
              items={[
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '20', value: '20' },
              ]}
            // Icon={() => {
            //   return <Ionicons name={"md-arrow-dropdown"} size={30} style={styles.dropDown} />;
            // }}
            />
          </View>
        </View>

        <View style={styles.button}>
          <Text style={styles.textButton}>Ajouter un service</Text>
        </View>

      </SafeAreaView>
    );

  }

}
