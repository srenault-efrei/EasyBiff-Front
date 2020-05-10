import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === 'android' ? 40 : 0
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  topView: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    paddingVertical: 10,
    flexDirection: "row"
  },
  loginView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30
  },

  bottomView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  title: {
    fontSize: 60,
    color: "#000"
  },
  button: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.customLightGreen,
    borderRadius: 10,
  },
  halfButton: {
    height: 40,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.customLightGreen,
    borderRadius: 10,
    marginHorizontal: 10
  },
  textButton: {
    color: "white",
    width: "100%",
    textAlign: 'center'
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderWidth: 1.0,
    borderRadius: 10
  },
  inputRow: {
    width: "100%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center'
  },
  error: {
    height: 'auto',
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    textAlign: "center",
    fontSize: 16
  },
  card: {
    width: '90%',
    alignItems: 'center',
    borderColor: 'black',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    marginLeft: 0
  },
  dateInput: {
    position: 'absolute',
    marginLeft: 36,
    borderWidth: 0,
    left: 0
  },
  buttonPassword: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    marginTop: 10
  },
  logo: {
    width: '80%',
    height: 140
  },
  headerLogo: {
    width: '60%',
    height: 120
  },
  header: {
    backgroundColor: colors.customDarkGreen,
    justifyContent: 'space-around',
    paddingTop: 0,
    marginBottom: "auto",
    height: Platform.select({
      android: 56,
      default: 44
    })
  }
});
