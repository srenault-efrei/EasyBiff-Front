import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer, DrawerActions} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItem,DrawerContentScrollView} from '@react-navigation/drawer'
import SplashScreen from './SplashScreen'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Profile from './Profil'
import Services from './Services'
import ServicesCusto from './ServicesCusto'
import Preference from './Preference';
import EditService from './EditService'
import AddService from './AddService'

import Details from './ShowService';
import Payment from './Payement'

export interface Props {
  navigation:any
}


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



function createCustomMenu(props:Props){
  const jumpToConnexion = DrawerActions.jumpTo('StackApp',{screen:'Preference'})
  const jumpToServices = DrawerActions.jumpTo('StackApp',{screen:'Services'})


  return(
    <DrawerContentScrollView {...props}>
      <DrawerItem
      label ="Services"
      onPress = {() => { props.navigation.dispatch(jumpToServices)}}
      />
      <DrawerItem label='Preference' onPress = {() => { props.navigation.dispatch(jumpToConnexion)}}></DrawerItem>  
    </DrawerContentScrollView>
  )
}

function createAppStack() {
  return  (
    <Stack.Navigator   headerMode="none"  initialRouteName='SplashScreen' screenOptions={{gestureEnabled: false}} >
      <Stack.Screen name ='ServicesCusto' component = {ServicesCusto} />
      <Stack.Screen name ='Services' component = {Services} />
      <Stack.Screen name ='Profil' component = {Profile} />
      <Stack.Screen name ='SplashScreen' component = {SplashScreen} />
      <Stack.Screen name="Connexion" component={SignIn} />
      <Stack.Screen name="Inscription" component={SignUp} />
      <Stack.Screen name="Preference" component={Preference} />
      <Stack.Screen name="EditService" component={EditService} />
       <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="Details service" component={Details} />
      <Stack.Screen name="Payment" component={Payment} />
      
    </Stack.Navigator>
  )
}

const app = () => {

  return (
    <NavigationContainer>
    <Drawer.Navigator drawerContent = { props => createCustomMenu(props)}  screenOptions={{swipeEnabled:false,gestureEnabled:false}} > 
    <Drawer.Screen name='StackApp' component={createAppStack} />
    </Drawer.Navigator>
    </NavigationContainer>

  )

}


export default registerRootComponent(app)