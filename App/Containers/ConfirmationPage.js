// @flow

import React from 'react'
import {ScrollView, Text, Animated, View, Dimensions, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Modal from 'react-native-modalbox'

// Styles
import styles from './Styles/ConfirmationPageStyle'


class ConfirmationPage extends React.Component {


  componentWillMount() {
    this.setState({isOpen: true});
  }

  render() {
    return (


      <View>
        <Text style={styles.text}>
          ReactNativeModalBox
        </Text>
        <TouchableHighlight onPress={() => NavigationActions.pop()}>
          <Text>close</Text>
        </TouchableHighlight>
        <Text>
          (swipe down to close)
        </Text>
      </View>
    );
  }


}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage)
