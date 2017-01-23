// @flow

import React, { PropTypes } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TemperatureActions from '../Redux/TemperatureRedux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Images, Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';



// Styles
import styles from './Styles/TownshipInputScreenStyle'

// I18n
import I18n from 'react-native-i18n'
import * as LayoutAnimation from "react-native/Libraries/LayoutAnimation/LayoutAnimation";

class TownshipInputScreen extends React.Component {


  constructor (props: Object) {
    super(props);
    this.state = {
      email : 'string',
      temperature: 'string'
         }

  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize = Metrics.screenHeight - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  };

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  };

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  };


  handlePressSend = () => {
    this.props.requestTemperature(this.state.email);
    NavigationActions.deviceInfo();
  };


  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position' style={{marginTop:64, marginLeft:20}}>
          <Hideo
            iconClass={FontAwesomeIcon}
            iconName={'envelope'}
            iconColor={'blue'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'white'}
            inputStyle={{ color: '#464949' }}
            onChangeText={this.handleChangeEmail}
            autoCorrect={false}
          />
          <TouchableOpacity onPress={this.handlePressSend}>
            <Icon name='send' size={Metrics.icons.medium} color={Colors.error} />
          </TouchableOpacity>
          <Spinner visible={this.props.isfetching} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
          {/*<Text>{this.props.isfetching ? 'true' : 'false'}</Text>*/}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

TownshipInputScreen.propTypes = {

  requestTemperature: PropTypes.func,
  temperature: PropTypes.string,
  isfetching: PropTypes.bool

};

const mapStateToProps = (state) => {console.log(state.temperature.fetching);
  return {

    temperature: state.temperature.temperature,
    isfetching: state.temperature.fetching

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    requestTemperature: (email) => dispatch(TemperatureActions.temperatureRequest(email))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TownshipInputScreen)
