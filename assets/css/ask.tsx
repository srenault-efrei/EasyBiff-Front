import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';


export default StyleSheet.create({

    viewPage: {
        flex: 1,
    },

    viewServiceAsk: {
        marginLeft: 10,
        flexDirection: "row",
        alignContent: "space-between",
    },


    viewAsk: {
        marginTop: 20,
        justifyContent: "center",
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        height: 70,
        width: 230,

    },


    viewValidAsk: {
        marginTop: 20,
        justifyContent: "center",
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        height: 70,
        width: "98%",
        backgroundColor: "#dfeedf",
        alignItems: "center",

    },

    viewRefusedAsk: {
        marginTop: 20,
        justifyContent: "center",
        paddingLeft: 10,
        borderWidth: 1,
        alignItems: "center",
        borderColor: 'gray',
        borderRadius: 4,
        height: 70,
        width: "98%",
        backgroundColor: "#FEAAAA",

    },

    textUnderline: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        

    }




});