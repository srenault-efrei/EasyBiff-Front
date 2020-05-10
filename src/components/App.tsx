
import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer, DrawerActions} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItem,DrawerContentScrollView} from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './SplashScreen'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Profile from './Profil'
import Services from './Services'
import ServicesCusto from './ServicesCusto'
import Preference from './Preference';
import EditService from './EditService'
import AddService from './AddService'
import Asks from './Asks'
import AsksCusto from './AsksCusto'
import Details from './ShowService';
import Payment from './Payment'
import ForgotPassword from './ForgotPassword'
import ProfileView from './ViewProfile'
export interface Props {
  navigation:any
}
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function serviceScreen(){
  return(
    <Tab.Navigator  initialRouteName='Services'>
          <Tab.Screen name="Services" component={Services} />
          <Stack.Screen name="Demandes" component={Asks} />
        </Tab.Navigator>
    );
}

function serviceScreenCusto(){
  return(
    <Tab.Navigator  initialRouteName='ServicesCusto' backBehavior='initialRoute'>
          <Tab.Screen name="Services" component={ServicesCusto} />
          <Stack.Screen name="Demandes" component={AsksCusto} />
        </Tab.Navigator>
    );
}
function createCustomMenu(props:Props){
  const jumpToProfile = DrawerActions.jumpTo('StackApp',{screen:'Profil'})
  const jumpToServices = DrawerActions.jumpTo('StackApp',{screen:'Services'})
  return(
    <DrawerContentScrollView {...props}>
      <DrawerItem
      label ="Services"
      onPress = {() => { props.navigation.dispatch(jumpToServices)}}
      />
      <DrawerItem label='Profil' onPress = {() => { props.navigation.dispatch(jumpToProfile)}}></DrawerItem>  
    </DrawerContentScrollView>
  )
}
function createAppStack() {
  return  (
    <Stack.Navigator   headerMode="none"  initialRouteName='SplashScreen'  >
      <Stack.Screen name ='ServicesCusto' component = {serviceScreenCusto} />
      <Stack.Screen name ='Services' children = {serviceScreen} />
      <Stack.Screen name ='Profil' component = {Profile} />
      <Stack.Screen name ='SplashScreen' component = {SplashScreen} />
      <Stack.Screen name="Connexion" component={SignIn} />
      <Stack.Screen name="Inscription" component={SignUp} />
      <Stack.Screen name="Preference" component={Preference} />
      <Stack.Screen name="EditService" component={EditService} />
       <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="Details service" component={Details} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ProfileView" component={ProfileView} />
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