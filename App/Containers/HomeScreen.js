// @flow

import React, {PropTypes} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MessageGetActions from '../Redux/MessageGetRedux'
import ItemGetActions from '../Redux/ItemGetRedux'

import {Metrics} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {Images, Colors} from '../Themes'
import * as Animatable from 'react-native-animatable'
import {Actions as NavigationActions} from 'react-native-router-flux'
import SwipeableViews  from 'react-swipeable-views-native';
import {autoPlay} from 'react-swipeable-views-utils';
import Pagination from '../Components/Pagination';
import RoundedButton from '../Components/RoundedButton';


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
      name: props.name,
      index: 0,
      aplay: true
    }
  }

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
    if (index == 0) {
      this.props.requestItemGet(this.state.user);
      this.props.requestMessageGet(this.state.user);
      this.setState({
        aplay: false
      });
    }

  };

  componentWillMount() {
    //this.props.requestItemGet(this.state.user);
  }

  render() {
    let img = 'http://127.0.0.1:5000/static/img/256px-Weiser_State_Forest_Walking_Path.jpg';
    const {
      index, aplay
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containertwo}>
          <View style={styles.slideContainer}>
            <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex} autoplay={aplay}>
              <View style={{flexDirection:'row', flex:1, alignItems:'center', backgroundColor:'#F4B459'}}>
                <Image source={{uri: img}} style={{width:40, height:40, borderRadius:20, marginLeft:20}}/>
                <View style={{justifyContent:'flex-end', padding:10}}>
                  <Text
                    style={{fontFamily:'AvenirNext-UltraLight', fontSize:24, fontWeight:'100'}}>Hi {this.state.name}</Text>
                </View>
              </View>
              <View style={[styles.slide, styles.slide3]}>
                <RoundedButton onPress={NavigationActions.messageList}>
                  My Messages
                </RoundedButton>
                <RoundedButton onPress={NavigationActions.itemInput}>
                  Profile
                </RoundedButton>
              </View>
            </AutoPlaySwipeableViews>
            <Pagination
              dots={2}
              index={index}
              onChangeIndex={this.handleChangeIndex}
            />
          </View>

          <TouchableHighlight onPress={()=> NavigationActions.listviewExample()}
                              style={{flex:0.45, backgroundColor:'#F1E7D1'}}>
            <Animatable.Image animation='fadeInLeft' source={Images.buy}
                   style={{flex:0.45, alignSelf:'center', resizeMode:'cover'}}>

            </Animatable.Image>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> NavigationActions.myItems()} style={{flex:0.45, backgroundColor:'#F1E7D1'}}>

            <Animatable.Image animation="fadeInRight" source={Images.sell}
                              style={{flex:0.45, alignSelf:'center', resizeMode:'cover', backgroundColor:'#F1E7D1'}}>


            </Animatable.Image>
          </TouchableHighlight>

        </View>

      </ScrollView>
    )
  }

}

HomeScreen.propTypes = {

  requestMessageGet: PropTypes.func,
  requestItemGet: PropTypes.func,
  name: PropTypes.string,
  user: PropTypes.string

};

const mapStateToProps = (state) => {
  return {

    name: state.login.username.first_name,
    user: state.login.username._id.$oid

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    requestMessageGet: (params) => dispatch(MessageGetActions.messageGetRequest(params)),
    requestItemGet: (params) => dispatch(ItemGetActions.itemGetRequest(params))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
