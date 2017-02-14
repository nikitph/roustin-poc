// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 20,
    marginHorizontal: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
    backgroundColor: '#B18A6A',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FCDCB8',
    textAlign: 'center',
    fontWeight: '200',
    fontFamily: 'Avenir',
    fontSize: Fonts.size.small,
    marginHorizontal: Metrics.baseMargin
  }
})
