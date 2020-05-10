import { StyleSheet } from 'react-native';
import { colors } from './colors';

export default StyleSheet.create({
    header:{
        backgroundColor: "#00BFFF",
        height:200,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: colors.customLightGreen,
        alignSelf:'center',
    },
    img:{
        width: 20,
        height: 20
    },
    infos:{
        fontWeight: "600"
    },
    item: {
        width: 250
    },
    register: {
        width: 250
    }
})