// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: '#F4B459'
  },
  row: {
    flex: 1,
    backgroundColor: '#F0D796',
    borderBottomColor: Colors.transparentblack,
    margin: 2,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.charcoal,
    textAlign: 'center',
    marginVertical: Metrics.smallMargin
  },
  label: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: Colors.charcoal,
    marginBottom: Metrics.smallMargin
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
