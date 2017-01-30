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
import SwipeableViews  from 'react-swipeable-views-native';
import {autoPlay} from 'react-swipeable-views-utils';
import Pagination from '../Components/Pagination';


// Styles
import styles from './Styles/HomeScreenStyle'

// I18n
import I18n from 'react-native-i18n'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class HomeScreen extends React.Component {

  constructor(props: Object) {
    super(props);
    this.state = {
      building: props.building,
      user: props.user,
      index: 0,
      aplay: true
    }
  }

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
    if (index == 0) {
      this.setState({
        aplay: false
      });
    }

  };

  render() {
    let img = 'http://127.0.0.1:5000/static/img/256px-Weiser_State_Forest_Walking_Path.jpg';
    console.tron.log(img);
    const {
      index, aplay
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containertwo}>
          <View style={styles.slideContainer}>
            <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex} autoplay={aplay}>
              <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
                <Image source={{uri: img}} style={{width:40, height:40, borderRadius:20, marginLeft:20}}/>
                <View style={{justifyContent:'flex-end', padding:10}}>
                  <Text style={{fontFamily:'AvenirNext-UltraLight', fontSize:32, fontWeight:'100'}}>Hi nikit</Text>
                </View>
              </View>
              <View style={[styles.slide, styles.slide2]}>
                <Text style={styles.text}>
                  slide n°2
                </Text>
              </View>
              <View style={[styles.slide, styles.slide3]}>
                <Text style={styles.text}>
                  slide n°3
                </Text>
              </View>
            </AutoPlaySwipeableViews>
            <Pagination
              dots={3}
              index={index}
              onChangeIndex={this.handleChangeIndex}
            />
          </View>

          <TouchableHighlight onPress={()=> NavigationActions.deviceInfo()} style={{flex:0.42}}>
            <Image source={Images.buy}
                   style={{flex:0.45, alignSelf:'center', resizeMode:'cover'}}>

            </Image>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> NavigationActions.deviceInfo()} style={{flex:0.42}}>

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
