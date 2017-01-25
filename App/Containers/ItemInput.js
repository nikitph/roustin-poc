// @flow

import React, {PropTypes} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View, Keyboard, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import ItemActions from '../Redux/ItemRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Colors, Images, Metrics} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';

// Styles
import styles from './Styles/ItemInputStyle'
import t from 'tcomb-form-native'

// I18n
import I18n from 'react-native-i18n'


let Form = t.form.Form;

let Item = t.struct({
  item_summary: t.String,              // a required string
  details: t.maybe(t.String),  // an optional string
  price: t.Number,               // a required number
  sold: t.Boolean,        // a boolean
  negotiable: t.Boolean,        // a boolean
});

let options = {}; // optional rendering options (see documentation)


class ItemInput extends React.Component {

  constructor(props: Object) {
    super(props);
    this.state = {
      item_summary: null,
      details: null,
      price: 1,
      sold: false,
      negotiable: true,
      building: props.building,
      user: props.user
    }

  }

  handlePressSend = () => {
    console.log(this.state);
    this.props.requestItem(this.state);
  };


  handleOnChange = (value) => {
    console.log(this.state);
    this.setState(value);
    console.log(this.state)
  };

  onChange = (value, path) => {
    // validate a field on every change
    console.log(this.props);
    console.log(this.refs.form.getValue());
    this.refs.form.getComponent(path).validate();
    this.setState(this.refs.form.getValue());
  };


  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position' style={{marginTop:64, marginLeft:20, marginRight:20}}>
          <Form
            ref="form"
            type={Item}
            options={options}
            value={this.state}
            onChange={this.onChange}
          />
          <TouchableOpacity onPress={this.handlePressSend}>
            <Icon name='send' size={Metrics.icons.medium} color={Colors.error}/>
          </TouchableOpacity>
          <Spinner visible={this.props.isfetching} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
          {/*<Text>{this.props.isfetching ? 'true' : 'false'}</Text>*/}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}


ItemInput.propTypes = {

  requestItem: PropTypes.func,
  isfetching: PropTypes.bool,
  building: PropTypes.string,
  user: PropTypes.string

};

const mapStateToProps = (state) => {
  console.log(state.login);
  return {

    isfetching: state.item.fetching,
    building: state.login.username.buildingid,
    user: state.login.username._id.$oid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    requestItem: (params) => dispatch(ItemActions.itemRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemInput)
