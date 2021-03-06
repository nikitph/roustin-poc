// @flow

import React, {PropTypes} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View, Keyboard, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import ItemPostActions from '../Redux/ItemPostRedux'
import ItemPatchActions from '../Redux/ItemPatchRedux'
import ItemDeleteActions from '../Redux/ItemDeleteRedux'

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

import Former from '../Components/Former'

// I18n
import I18n from 'react-native-i18n'

console.tron.log(t.form.Form.formGroup);

let _ = require('lodash');

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.formGroup.normal.marginBottom = 10;
stylesheet.formGroup.error.marginBottom = 10;
stylesheet.controlLabel.normal.color = '#414535';
stylesheet.controlLabel.normal.fontSize = 17;
stylesheet.controlLabel.normal.fontFamily = 'AvenirNext-UltraLight';
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
stylesheet.textbox.normal.borderColor = '#618985';
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
    if (props.shouldEdit) {
      console.tron.log(props);
      this.state = {
        item_summary: props.data.item_summary,
        details: props.data.details,
        price: props.data.price,
        sold: props.data.sold,
        negotiable: props.data.negotiable,
        building: props.building,
        user: props.user,
        user_name: props.user_name,
        _id: props.data._id,
        _etag: props.data._etag
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
        user: props.user,
        user_name: props.user_name

      }
    }

  }

  handlePressEdit = () => {
    this.props.patchItem(this.state);
  };

  handlePressSend = () => {
    this.props.requestItem(this.state);
  };

  handlePressDelete = () => {
    this.props.deleteItem(this.state);
  };

  onChange = (value, path) => {
    // validate a field on every change
    console.log(path);
    this.refs.fcon.refs.form.getComponent(path).validate();
    this.setState(this.refs.fcon.refs.form.getValue());
  };

  render() {
    return (
      <Former onChange={this.onChange} handlePressSend={this.handlePressSend} options={options} structure={Item}
              ref="fcon" value={this.state}/>
    )
  }

}


ItemInput.propTypes = {

  requestItem: PropTypes.func,
  patchItem: PropTypes.func,
  isfetching: PropTypes.bool,
  building: PropTypes.string,
  user: PropTypes.string,
  user_name: PropTypes.string

};

const mapStateToProps = (state) => {
  return {

    isfetching: state.itempost.fetching || state.itempatch.fetching,
    building: state.login.username.buildingid,
    user: state.login.username._id.$oid,
    user_name: state.login.username.first_name
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    requestItem: (params) => dispatch(ItemPostActions.itemPostRequest(params)),
    patchItem: (params) => dispatch(ItemPatchActions.itemPatchRequest(params)),
    deleteItem: (params) => dispatch(ItemDeleteActions.itemDeleteRequest(params)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInput)
