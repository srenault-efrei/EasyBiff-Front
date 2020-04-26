import { StyleSheet, Platform, View } from 'react-native';

export default StyleSheet.create({

    safeArea: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 50,
    },

    scrollView:{
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
        width: 300
    },

    dateInput:{
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        height: 40
      
      },
      button: {
        height: 40,
        width: "70%",
        top:50,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        color: "white",
        borderRadius: 4,

      },

      textButton: {
        color: "white"
      },

      

});