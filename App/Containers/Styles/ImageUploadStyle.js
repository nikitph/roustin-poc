// @flow

import {StyleSheet} from 'react-native'
import {ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
    paddingTop: 40,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 73,
    height: 73,
    borderWidth: 1,
    borderColor: '#DDD',
    margin: 5,
  },
  modal: {
    margin: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'lightyellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  button: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#EEE',
    marginHorizontal: 5,
  }
})
