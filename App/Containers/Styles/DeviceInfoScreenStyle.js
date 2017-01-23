// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  slideContainer: {
    flex: 0.2
  },
  slide: {
    padding: 15,
    height: 100,
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  cardTitle: {
    alignSelf: 'center',
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    marginVertical: Metrics.baseMargin,
    color: Colors.snow
  },
  cardContainer: {
    backgroundColor: Colors.ember,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: Colors.panther,
    shadowOffset: {
      height: 7,
      width: 7
    },
    shadowRadius: 2,
    paddingBottom: Metrics.baseMargin,
    margin: Metrics.baseMargin
  },
  rowContainer: {
    flexDirection: 'row',
    borderColor: Colors.windowTint,
    borderWidth: 0.5,
    borderRadius: 2,
    marginHorizontal: Metrics.baseMargin
  },
  rowLabelContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.snow
  },
  rowLabel: {
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin
  },
  rowInfoContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: Colors.silver
  },
  rowInfo: {
    fontSize: Fonts.size.regular,
    margin: Metrics.baseMargin
  }
})
