import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';


export default StyleSheet.create({
    safeArea: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
    },

    scrollView: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    view: {
        marginTop: 20,
        marginLeft: 10
    },
    view_row: {
        flexDirection: "row",
        justifyContent: "center"
    },
    label: {
        fontSize: 15,
        marginBottom: 5
    },
    picker: {
        borderRadius: 3,
        borderColor: "black"
    },
    dropDown: {
        padding: 10
    },
    euro: {
        padding: 15,
        marginRight: 220
    },
    inputIOS: {
        fontSize: 15,
        paddingLeft: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        height: 40,
        width: 310
    },
    input: {
        fontSize: 15,
        paddingLeft: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        height: 40,
        width: 150
    },
    description: {
        fontSize: 15,
        paddingLeft: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        height: 50,
        width: 310
    },

    dateInput: {
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        height: 40

    },

    editButton: {
        height: 40,
        width: "43%",
        top: 20,
    },


    viewService: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        height: 40,
        width: 300
    },

  

    viewServiceAsk: {

        marginLeft: 10,
        flexDirection: "row",
        alignContent: "space-between",
    },
    addService: {
        fontSize: 18,
        color: "green",
        marginTop: 20,
        fontWeight: "bold",
    },
  loginView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30
    },
    viewPage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      cardContainer:{
        width:"90%",
        marginTop: 10,
        alignItems:"center",
        justifyContent: "center",
        textAlign:'center',
        alignSelf:"center",
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        height: 60,
      },
      researchContainer:{
        width:'100%',
        borderColor:'black',
        justifyContent:'space-around',
        borderBottomWidth:1,
        flexDirection: 'row',
      },
      inputResearch: {
        width: "60%",
        height: 40,
        margin: 10,
        paddingHorizontal: 10,
        borderWidth: 1.0,
        borderRadius: 1,
        alignSelf:"flex-start",
      },
      card:{
        width:'100%',
        borderColor:'black',
        justifyContent:'space-around',
        flexDirection: 'row',
      },
      button: {
        height: 40,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf:'center',
        backgroundColor: "rgb(85,119,186)",
        borderRadius: 10,
      },
      halfButton: {
        height: 40,
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        borderRadius: 10,
        marginHorizontal: 10
      },
      textButton: {
        color: "white",
        width: "100%",
        textAlign: 'center'
      },
});