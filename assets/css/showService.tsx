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
    name:{
      fontSize:22,
      color:"#000000",
      fontWeight:'600',
    },
    title:{
      fontSize:22,
      color:"#000000",
      fontWeight:'600',
      marginBottom: 20,
    },
    userInfo:{
      fontSize:16,
      color:"#000",
      fontWeight:'500',
    },
    body:{
      backgroundColor: "#778899",
      height:500,
      alignItems:'center',
    },
    item:{
      flexDirection : 'row',
    },
    infoContent:{
      flex:1,
      alignItems:'flex-start',
      paddingLeft:5
    },
    iconContent:{
      flex:1,
      alignItems:'flex-end',
      paddingRight:5,
    },
    icon:{
      width:30,
      height:30,
      marginTop:20,
    },
    info:{
      fontSize:18,
      marginTop:20,
      color: "#FFFFFF",
    },
    card:{
      width: 200,
    }
  });