// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.clear,
    overflow: 'hidden'
  },
  form: {
    backgroundColor: Colors.clear,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 4,
  },
  row: {
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.transparentblack,
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal,
    fontFamily: 'Avenir'

  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    marginTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.bloodOrange,
    backgroundColor: Colors.transparent,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.ember,
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.5,
  }
  ,
  loginbg: {
    position: 'absolute',
    top: 190,
    left: 0,
    right: 0,
    zIndex: -1,
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 1.5,
    height: Metrics.screenHeight * .8

  }
})
