// @flow

import React, {PropTypes} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, Image, View} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Metrics} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Animatable from 'react-native-animatable'
import {Actions as NavigationActions} from 'react-native-router-flux'

// Styles
import styles from './Styles/HomeScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class HomeScreen extends React.Component {

  constructor(props: Object) {
    super(props);
    this.state = {
      building: props.building,
      user: props.user
    }
  }

  render() {
    let img = 'http://127.0.0.1:5000/' + this.props.img;
    console.tron.log(img);

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={{flexDirection:'row', marginTop:64, flex:0.2}}>
            <Image source={{uri: img}} style={{width:40, height:40, borderRadius:20}}/>
            <View style={{justifyContent:'flex-end', padding:5}}>
              <Text style={styles.label}>Hi {this.state.user}</Text>
            </View>
          </View>
          <View style={{flex:0.4}}>
            <Icon name="tag" size={40} color="#900"/>
          </View>
          <View style={{flex:0.4}}>
            <Icon name="basket" size={30} color="#900"/>
            <Text>HomeScreen Container</Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

HomeScreen.propTypes = {

  building: PropTypes.string,
  user: PropTypes.string,
  img: PropTypes.string

};

const mapStateToProps = (state) => {
  return {

    building: state.login.username.buildingid,
    user: state.login.username.first_name,
    img: state.login.username.image
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
