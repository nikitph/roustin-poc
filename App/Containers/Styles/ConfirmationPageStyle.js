// @flow

import {StyleSheet} from 'react-native'
import {Colors, Metrics, ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4B459',
  },
  text: {
    color: "black",
    fontSize: 22
  },
})