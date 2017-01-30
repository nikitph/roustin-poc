// @flow

import React, {PropTypes} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Metrics} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {Images} from '../Themes'
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
    let img = 'http://127.0.0.1:5000/static/img/256px-Weiser_State_Forest_Walking_Path.jpg';
    console.tron.log(img);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containertwo}>
          <View style={{flexDirection:'row', marginTop:64, flex:0.1, alignItems:'center'}}>
            <Image source={{uri: img}} style={{width:40, height:40, borderRadius:20, marginLeft:20}}/>
            <View style={{justifyContent:'flex-end', padding:10}}>
              <Text style={{fontFamily:'AvenirNext-UltraLight', fontSize:32, fontWeight:'100'}}>Hi nikit</Text>
            </View>
          </View>
          <TouchableHighlight onPress={()=> NavigationActions.deviceInfo()} style={{flex:0.45}}>
            <Image source={Images.buy}
                   style={{flex:0.45, alignSelf:'center', resizeMode:'cover'}}>

            </Image>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> NavigationActions.deviceInfo()} style={{flex:0.45}}>

            <Image source={Images.sell}
                   style={{flex:0.45, alignSelf:'center', resizeMode:'cover'}}>


            </Image>
          </TouchableHighlight>

        </View>

      </ScrollView>
    )
  }

}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
