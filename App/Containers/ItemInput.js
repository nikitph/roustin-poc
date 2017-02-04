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

console.tron.log(t.form.Form.formGroup);

let _ = require('lodash');

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.formGroup.normal.marginBottom = 10;
stylesheet.formGroup.error.marginBottom = 10;
stylesheet.controlLabel.normal.color = 'red';
stylesheet.controlLabel.normal.fontSize = 17;
stylesheet.controlLabel.normal.fontFamily = 'Cochin';
stylesheet.controlLabel.normal.marginBottom = 7;
stylesheet.controlLabel.normal.fontWeight = '300';
stylesheet.controlLabel.error.color = '#a94442';
stylesheet.controlLabel.error.fontSize = 17;
stylesheet.controlLabel.error.marginBottom = 7;
stylesheet.controlLabel.error.fontWeight = '500';
stylesheet.helpBlock.normal.color = '#999999';
stylesheet.helpBlock.normal.fontSize = 17;
stylesheet.helpBlock.normal.marginBottom = 2;
stylesheet.helpBlock.error.color = '#999999';
stylesheet.helpBlock.error.fontSize = 17;
stylesheet.helpBlock.error.marginBottom = 2;
stylesheet.errorBlock.fontSize = 17;
stylesheet.errorBlock.marginBottom = 2;
stylesheet.errorBlock.color = '#a94442';
stylesheet.textbox.normal.color = '#000000';
stylesheet.textbox.normal.fontSize = 17;
stylesheet.textbox.normal.height = 36;
stylesheet.textbox.normal.padding = 7;
stylesheet.textbox.normal.borderRadius = 4;
stylesheet.textbox.normal.borderColor = '#cccccc';
stylesheet.textbox.normal.borderWidth = 1;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;
stylesheet.textbox.notEditable.fontSize = 17;
stylesheet.textbox.notEditable.height = 36;
stylesheet.textbox.notEditable.padding = 7;
stylesheet.textbox.notEditable.borderRadius = 4;
stylesheet.textbox.notEditable.borderColor = '#cccccc';
stylesheet.textbox.notEditable.borderWidth = 1;
stylesheet.textbox.notEditable.marginBottom = 5;
stylesheet.textbox.notEditable.color = '#777777';
stylesheet.textbox.notEditable.backgroundColor = '#eeeeee';
stylesheet.checkbox.normal.marginBottom = 4;
stylesheet.checkbox.error.marginBottom = 4;
stylesheet.pickerContainer.normal.marginBottom = 4;
stylesheet.pickerContainer.normal.borderRadius = 4;
stylesheet.pickerContainer.normal.borderColor = '#cccccc';
stylesheet.pickerContainer.normal.borderWidth = 1;
stylesheet.pickerContainer.error.borderColor = '#a94442';
// stylesheet.select.normal.android.paddingLeft=7;
// stylesheet.select.normal.android.color='#000000';
// stylesheet.select.error.android.paddingLeft=7;
// stylesheet.select.error.android.color='#a94442';
stylesheet.pickerTouchable.normal.height = 44;
stylesheet.pickerTouchable.normal.flexDirection = 'row';
stylesheet.pickerTouchable.normal.alignItems = 'center';
stylesheet.pickerTouchable.error.height = 44;
stylesheet.pickerTouchable.error.flexDirection = 'row';
stylesheet.pickerTouchable.error.alignItems = 'center';
stylesheet.pickerTouchable.active.borderBottomWidth = 1;
stylesheet.pickerTouchable.active.borderColor = '#cccccc';
stylesheet.pickerValue.normal.fontSize = 17;
stylesheet.pickerValue.normal.paddingLeft = 7;
stylesheet.pickerValue.error.fontSize = 17;
stylesheet.pickerValue.error.paddingLeft = 7;
stylesheet.datepicker.normal.marginBottom = 4;
stylesheet.datepicker.error.marginBottom = 4;
stylesheet.dateValue.normal.color = '#000000';
stylesheet.dateValue.normal.fontSize = 17;
stylesheet.dateValue.normal.padding = 7;
stylesheet.dateValue.normal.marginBottom = 5;
stylesheet.dateValue.error.color = '#a94442';
stylesheet.dateValue.error.fontSize = 17;
stylesheet.dateValue.error.padding = 7;
stylesheet.dateValue.error.marginBottom = 5;
stylesheet.buttonText.fontSize = 18;
stylesheet.buttonText.color = 'white';
stylesheet.buttonText.alignSelf = 'center';
stylesheet.button.height = 36;
stylesheet.button.backgroundColor = '#48BBEC';
stylesheet.button.borderColor = '#48BBEC';
stylesheet.button.borderWidth = 1;
stylesheet.button.borderRadius = 8;
stylesheet.button.marginBottom = 10;
stylesheet.button.alignSelf = 'stretch';
stylesheet.button.justifyContent = 'center';

let Form = t.form.Form;

let Item = t.struct({
  item_summary: t.String,              // a required string
  details: t.maybe(t.String),  // an optional string
  price: t.Number,               // a required number
  sold: t.Boolean,        // a boolean
  negotiable: t.Boolean,        // a boolean
});

let options = {stylesheet: stylesheet}; // optional rendering options (see documentation)


class ItemInput extends React.Component {

  constructor(props: Object) {
    super(props);
    if (props.isediting) {
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
    else {
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
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.containertwo}>
            <View style={{flex:0.9, marginTop:64, marginLeft:5, marginRight:5}}>
          <Form
            ref="form"
            type={Item}
            options={options}
            value={this.state}
            onChange={this.onChange}
          />
            </View>
            <View style={styles.slideContainer}>
              <TouchableOpacity onPress={() => this.onPressButton(this.props.data)}
                                style={{flex:1, alignItems: 'center',justifyContent: 'center'}}>
                <Text
                  style={{fontFamily:'AvenirNext-UltraLight', fontSize:20, fontWeight:'200',alignSelf:'center'}}>SAVE</Text>

              </TouchableOpacity>

            </View>
          </View>
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
  return {

    isfetching: state.item.fetching,
    building: state.login.username.buildingid,
    user: state.login.username._id.$oid
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    requestItem: (params) => dispatch(ItemActions.itemRequest(params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInput)
