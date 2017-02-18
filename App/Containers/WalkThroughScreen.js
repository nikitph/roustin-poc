// @flow

import {ScrollView, Text, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Metrics} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import {Actions as NavigationActions} from 'react-native-router-flux'

// Styles
import styles from './Styles/WalkThroughScreenStyle'

// I18n
import I18n from 'react-native-i18n'
import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import RoundedButton from '../Components/RoundedButton'


class WalkThroughScreen extends React.Component {

  render() {
    return (
      <View style={{flex:1}}>
        <IndicatorViewPager
          style={{flex:1}}
          indicator={this._renderDotIndicator()}
        >
          <View style={{backgroundColor:'cadetblue'}}>
            <Text>page one</Text>
          </View>
          <View style={{backgroundColor:'cornflowerblue'}}>
            <Text>page two</Text>
          </View>
          <View style={{backgroundColor:'#1AA094',justifyContent:'center', alignItems:'center'}}>
            <RoundedButton onPress={NavigationActions.loginModal}>
              {I18n.t('signIn')}
            </RoundedButton>

            <RoundedButton onPress={()=>NavigationActions.homeScreen({type:'reset'})}>
              {I18n.t('signIn')}
            </RoundedButton>
          </View>
        </IndicatorViewPager>


      </View>
    );
  }

  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={['one', 'two', 'three']}/>;
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3}/>;
  }

  _renderTabIndicator() {
    let tabs = [{
      text: 'Home',
      iconSource: require('../Images/buy.png'),
      selectedIconSource: require('../Images/buy.png')
    }, {
      text: 'Message',
      iconSource: require('../Images/buy.png'),
      selectedIconSource: require('../Images/buy.png')
    }, {
      text: 'Profile',
      iconSource: require('../Images/buy.png'),
      selectedIconSource: require('../Images/buy.png')
    }];
    return <PagerTabIndicator tabs={tabs}/>;
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WalkThroughScreen)
