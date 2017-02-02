// @flow

import React, {PropTypes} from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  TouchableHighlight,
  TextInput,
  TouchableOpacity
} from 'react-native'
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
import RoundedButton from '../Components/RoundedButton'

// Styles
import styles from './Styles/ItemDetailScreenStyle'

// I18n
import I18n from 'react-native-i18n'


class ItemDetailScreen extends React.Component {

  constructor(props: Object) {
    super(props);
    this.state = {
      item_data: props.data,
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

  onPressButton = (id) => {
    console.tron.log(id);
    NavigationActions.itemChat({data: id, title: 'p'});
  };

  render() {
    let img = 'http://127.0.0.1:5000/static/img/256px-Weiser_State_Forest_Walking_Path.jpg';
    const {
      item_data
    } = this.props.data;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containertwo}>

          <View style={{flex:0.9, marginTop:64}}>
            <View style={{flex:0.4}}>
              <Image source={Images.buy}
                     style={{width:100, height:100, alignSelf:'center', resizeMode:'contain'}}>

              </Image>

              <Text
                style={{fontFamily:'AvenirNext-UltraLight', fontSize:24, fontWeight:'100',alignSelf:'center'}}>{this.props.data.item_summary.toUpperCase()}</Text>

            </View>
            <View style={{flex:0.3}}>

              <Text
                style={{fontFamily:'AvenirNext-UltraLight', fontSize:20, fontWeight:'100',alignSelf:'center'}}>{this.props.data.details}</Text>
            </View>
            <View style={{flex:0.3}}>

              <Image source={Images.tag}
                     style={{width:150, height:150, alignSelf:'center', resizeMode:'contain'}}>
                <Text
                  style={{fontFamily:'AmericanTypewriter-Bold', fontSize:24, marginTop:75,fontWeight:'500',alignSelf:'center', backgroundColor:'transparent', color:'#CBB292'}}>{this.props.data.price}</Text>
              </Image>
            </View>
          </View>
          <View style={styles.slideContainer}>
            <TouchableOpacity onPress={() => this.onPressButton(this.props.data)}
                              style={{flex:1, alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{fontFamily:'AvenirNext-UltraLight', fontSize:20, fontWeight:'200',alignSelf:'center'}}>CONTACT SELLER</Text>

            </TouchableOpacity>

          </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailScreen)
