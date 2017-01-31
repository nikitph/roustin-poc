// @flow

import {StyleSheet} from 'react-native'
import {ApplicationStyles} from '../../Themes/'
import Metrics from '../../Themes/Metrics'


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {},
  containertwo: {
    flex: 1,
    height: Metrics.screenHeight,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#F2DFAE'
  },
  slideContainer: {
    flex: 0.5,
    position: 'relative'
  },
  slide: {
    flex: 1,
  },
  slide1: {
    backgroundColor: '#F4B459',
  },
  slide2: {
    backgroundColor: '#F4B459',
  },
  slide3: {
    backgroundColor: '#F4B459',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
})
