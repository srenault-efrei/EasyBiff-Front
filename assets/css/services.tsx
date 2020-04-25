import { StyleSheet, Platform, View } from 'react-native';

export default StyleSheet.create({

    safeArea: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 50,
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
        marginBottom: 15
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
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },

    input: {

        height: 40,
        borderWidth: 1.0,
        borderRadius: 4,
        width: 150,
        backgroundColor: "white",
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderColor: 'gray',
        color: 'black'
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
        width: "100%",
        top:20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        color: "white",
        borderRadius: 4
      },
      textButton: {
        color: "white"
      },

});