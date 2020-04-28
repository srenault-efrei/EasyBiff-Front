import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer, DrawerActions} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationScreenProp } from 'react-navigation'
import { createDrawerNavigator, DrawerItem,DrawerContentScrollView} from '@react-navigation/drawer'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Profile from './Profil'
import Services from './Services'
import ServicesCusto from './ServicesCusto'
import Preference from './Preference';

export interface Props {
  navigation:any
}


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



function createCustomMenu(props:Props){
  const jumpToConnexion = DrawerActions.jumpTo('StackApp',{screen:'Preferences'})
  const jumpToServices = DrawerActions.jumpTo('StackApp',{screen:'Services'})


  return(
    <DrawerContentScrollView {...props}>
      <DrawerItem
      label ="Services"
      onPress = {() => { props.navigation.dispatch(jumpToServices)}}
      />
      <DrawerItem label='Preferences' onPress = {() => { props.navigation.dispatch(jumpToConnexion)}}></DrawerItem>  
    </DrawerContentScrollView>
  )
}

function createAppStack() {
  return  (
    <Stack.Navigator   headerMode="none"  initialRouteName='Services'  >
      <Stack.Screen name ='ServicesCusto' component = {ServicesCusto} />
      <Stack.Screen name ='Services' component = {Services} />
      <Stack.Screen name ='Profil' component = {Profile} />
      <Stack.Screen name="Connexion" component={SignIn} />
      <Stack.Screen name="Inscription" component={SignUp} />
      <Stack.Screen name="Preference" component={Preference} />
      
    </Stack.Navigator>
  )
}

const app = () => {

  return (
    <NavigationContainer>
    <Drawer.Navigator drawerContent = { props => createCustomMenu(props)}  screenOptions={{swipeEnabled:false}} > 
    <Drawer.Screen name='StackApp' component={createAppStack} />
    </Drawer.Navigator>
    </NavigationContainer>

  )

}


export default registerRootComponent(app)