// @flow

import React, { PropTypes } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/FormerStyle'
import t from 'tcomb-form-native'

let Form = t.form.Form;

type FormerProps = {
  onChange: () => void,
  handlePressSend: () => void,
  text?: string,
  value?: Object,
  options?: Object,
  structure?: Object
}

export default class Former extends React.Component {

  props: FormerProps;

  render () {

    onChange = (value, path) => {
      // validate a field on every change
      //console.tron.log(this.refs.form.getValue());
      this.refs.form.getComponent(path).validate();
      console.log(this.refs.form.getValue());
      this.props.onChange(this.refs.form.getValue());
    };

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.containertwo}>
            <View style={{flex:0.9, marginTop:64, marginLeft:20, marginRight:20}}>
              <Form
                ref="form"
                type={this.props.structure}
                options={this.props.options}
                value={this.props.value}
                onChange={this.props.onChange}
              />
            </View>
            <View
              style={styles.slideContainer}>
              <TouchableOpacity onPress={this.props.handlePressSend} style={{flex:0.5}}>
                <Text
                  style={{fontFamily:'AvenirNext-UltraLight', fontSize:20, fontWeight:'200',alignSelf:'center'}}>SAVE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.handlePressSend} style={{flex:0.5}}>
                <Text
                  style={{fontFamily:'AvenirNext-UltraLight', fontSize:20, fontWeight:'200',alignSelf:'center'}}>DELETE</Text>
              </TouchableOpacity>

            </View>

          </View>
          {/*<Spinner visible={this.props.isfetching} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>*/}
          {/*<Text>{this.props.isfetching ? 'true' : 'false'}</Text>*/}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

// // Prop type warnings
// Former.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Former.defaultProps = {
//   someSetting: false
// }
