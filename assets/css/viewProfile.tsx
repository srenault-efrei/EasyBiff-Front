import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header:{
      backgroundColor: "#DCDCDC",
    },
    headerContent:{
      padding:30,
      alignItems: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
    },
    userInfo:{
      fontSize:16,
      color:"#000",
      fontWeight:'500',
    },
    itemsCenter:{
      alignItems: 'center', 
      justifyContent: 'center',
    },
    view: {
      flex: 1,
      justifyContent: "center",
    },
    bio: {
      fontWeight: '300',
    }
  });