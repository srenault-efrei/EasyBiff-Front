import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity

} from 'react-native';
import styles from '../../assets/css/services'
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'
import { TextInput } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation'

import MyHeader from './MyHeader'


export interface Props {
  serviceId: string
  route: any
  params: any
  navigation: NavigationScreenProp<any>

}

interface Items {
  label: string,
  value: string,

}

interface State {
  startDate: Date
  dateNow: Date
  endDate: Date
  startTime: string
  endTime: string
  typeService: string
  price: number
  postalCode: number
  city: string
  radius: number
  itemsCategories: Array<Items>
  itemsRadius: Array<Items>
  userId: string
  token: string
  description: string

}

export default class Service extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      startDate: new Date(),
      dateNow: new Date(),
      endDate: new Date(),
      startTime: new Date().getHours() + ':' + new Date().getMinutes(),
      endTime: new Date().getHours() + ':' + new Date().getMinutes(),
      typeService: '',
      price: 0,
      postalCode: 0,
      city: '',
      radius: 0,
      itemsCategories: [],
      itemsRadius: [],
      userId: this.props.route.params.user,
      token: this.props.route.params.token,
      description: ''

    }
  }


  componentDidMount() {
    this.fetchCategories()
    this.fetchRadius()
  }



  goTo = (page: string) => {
    this.props.navigation.navigate(page)
  }

  transfromDate = (value: string): Date => {
    let dateSplit: Array<string> = value.split('-')
    let date: Date = new Date(dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0])
    return date
  }

  dateWithTime = (value: Date, time: string): string => {
    let fullDate = value.getFullYear() + '-' + ("0" + (value.getMonth() + 1)).slice(-2) + '-' + ("0" + (value.getDate())).slice(-2) + 'T' + time
    return fullDate
  }

  verifPrice = (value: string): void => {
    let p: number = parseInt(value)

    if (Number.isInteger(p)) {
      this.setState({ price: p })
    }
    else {
      if (value != '') {
        alert('Vous devez rentrer un chiffre')
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



  isFieldEmpty = (): Boolean => {

    let bool: Boolean = false

    if (this.state.typeService == '' || this.state.price == 0 || this.state.postalCode == 0 || this.state.city == '' || this.state.radius == 0 || this.state.description == '') {
      bool = true
    }
    return bool
  }


  fetchRadius = (): Promise<void | never> => {

    return fetch('https://eazybiff-server.herokuapp.com/api/radius')
      .then((response) => response.json())
      .then((json) => {
        let tab: Array<Items> = []

        for (const radius of json.data.radius) {
          let obj: Items = { label: radius.kilometer.toString(), value: radius.id }
          tab.push(obj)
        }

        this.setState({ itemsRadius: tab })
      })
      .catch((error) => {
        console.error(error);
      });
  }


  fetchCategories = (): Promise<void | never> => {

    return fetch('https://eazybiff-server.herokuapp.com/api/categories')
      .then((response) => response.json())
      .then((json) => {
        let tab: Array<Items> = []

        for (const category of json.data.category) {
          let obj: Items = { label: category.name, value: category.id }
          tab.push(obj)
        }
        this.setState({ itemsCategories: tab })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  verifDate = (startDate: Date, endDate: Date): Boolean => {
    let bool: Boolean = false
    if (startDate > endDate) {
      alert(" La date de début ne peut pas etre supérieur à la date de fin.")
      return true
    }
    return bool
  }

  insertService = (): void => {
    if (this.isFieldEmpty()) {
      alert('Remplissez tous les champs')
    } else {
      if (!this.verifDate(this.state.startDate, this.state.endDate)) {
        fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.state.userId}/services`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Authorization': this.state.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            dateDebut: this.dateWithTime(this.state.startDate, this.state.startTime),
            dateFin: this.dateWithTime(this.state.endDate, this.state.endTime),
            postalCode: this.state.postalCode,
            description: this.state.description,
            city: this.state.city,
            price: this.state.price,
            categoryId: this.state.typeService,
            radiusId: this.state.radius,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.data != null || json.data != undefined) {
              this.goTo('Services')
            } else {
              alert(json.err.description)
              console.log(json.err.description)
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  render() {
    console.disableYellowBox = true;
    return (

      <View>
        <MyHeader navigation={this.props.navigation} name="Services" ></MyHeader>


        <SafeAreaView style={styles.safeArea}>

          <View style={{ marginLeft: 35 }}>
            <Text style={styles.label}>Choisissez un service</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Selectionner le type de service',
                value: null,
              }}
              onValueChange={(value) => this.setState({ typeService: value })}
              style={{ ...styles }}
              items={this.state.itemsCategories}
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
              <Text style={styles.label}>Heure de début</Text>
              <DatePicker
                style={{ width: 150 }}
                date={this.state.startTime}
                mode="time"
                placeholder="selectionner une heure"
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
                onDateChange={(time) => { this.setState({ startTime: time }) }}
              />
            </View>

            <View style={styles.view}>
              <Text style={styles.label}>Heure de fin </Text>
              <DatePicker
                style={{ width: 150 }}
                date={this.state.endTime}
                mode="time"
                placeholder="selectionner une heure"
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
                onDateChange={(time) => { this.setState({ endTime: time }) }}
              />

            </View>
          </View>


          <View style={styles.view_row}>
            <View style={styles.view}>
              <Text style={styles.label}> Code postal</Text>
              <TextInput style={styles.input}
                placeholder={"94310"}
                maxLength={5}
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
              <Text style={styles.label}>Rayon (Km)</Text>
              <RNPickerSelect
                placeholder={{
                  label: 'Choisir  un rayon',
                  value: null,
                }}
                onValueChange={(value) => this.setState({ radius: value })}
                style={{ ...stylesIos }}
                items={this.state.itemsRadius}
              />
            </View>

            <View style={{ marginTop: 20, marginLeft: 10 }}>

              <Text style={styles.label}>Prix (€)</Text>
              <TextInput style={styles.input}
                placeholder={"8"}
                onChangeText={value => this.verifPrice(value)}
                maxLength={2}>

              </TextInput>
            </View>
          </View>

          <View style={{ marginLeft: 35, top: 20 }}>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.description}
              placeholder={"Lave votre voiture, aucun produits à fournir"}
              multiline={true}
              numberOfLines={4}
              onChangeText={value => this.setState({ description: value })}
            >
            </TextInput>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row", top: 20, marginLeft: 50 }}>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => this.goTo('Services')}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "gray", fontSize: 20, fontWeight: "bold" }} >Annuler</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => this.insertService()}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "green", fontSize: 20, fontWeight: "bold" }} >Valider</Text>
              </View>
            </TouchableOpacity>


          </View>

        </SafeAreaView>
      </View>
    );

  }

}


const stylesIos = StyleSheet.create({

  inputIOS: {
    fontSize: 15,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    height: 40,
    width: 150,
  },

})