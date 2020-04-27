import { registerRootComponent } from 'expo';
import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './SignUp'
import SignIn from './SignIn'
import Profile from './Profil'
import Services from './Services'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function connexionScreen() {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Connexion" component={SignIn} />
      <Stack.Screen name="Inscription" component={SignUp} />
    </Stack.Navigator>
  );
}

const app = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Connexion">

        <Drawer.Screen name="Connexion" component={connexionScreen} />
        <Drawer.Screen name="Profil" component={Profile} />
        <Drawer.Screen name="Services" component={Services} />
      </Drawer.Navigator>
    </NavigationContainer>

  )

}

export default registerRootComponent(app)