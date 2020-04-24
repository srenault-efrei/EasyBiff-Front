import { StyleSheet, Platform } from 'react-native';

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
  loginView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30
  },
  topView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
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
    backgroundColor: "grey",
    color: "white",
    borderRadius: 10
  },
  textButton: {
    color: "white"
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderWidth: 1.0,
    borderRadius: 10
  }
});