// @flow

import React, {PropTypes} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View} from 'react-native'
import {connect} from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)

import MessageGetActions from '../Redux/MessageGetRedux'
import MessagePostActions from '../Redux/MessagePostRedux'

import {Metrics} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import {Actions as NavigationActions} from 'react-native-router-flux'

import {GiftedChat} from 'react-native-gifted-chat';

// Styles
import styles from './Styles/ChatDetailStyle'

// I18n
import I18n from 'react-native-i18n'

class ChatDetail extends React.Component {

  constructor(props: Object) {
    super(props);
    console.tron.log(props);
    this.state = {
      item: props.item,
      messages: props.messages,
      seller: props.seller,
      seller_name: props.seller_name,
      buyer: props.buyer,
      buyer_name: props.buyer_name,
      user: props.user,
      user_name: props.user_name
    };
    this.onSend = this.onSend.bind(this);
  }

  // componentWillMount() {
  //   console.log(this.props);
  //   //this.props.requestMessageGet(this.buyer);
  //   this.setState({
  //
  //     messages: this.props.messages.payload
  //
  //   });
  // }

  makeMsg = (message) => {

    message.buyer = this.state.buyer;
    message.buyer_name = this.state.buyer_name;
    message.seller = this.state.seller;
    message.seller_name = this.state.seller_name;
    message.building = this.props.building;
    message.sender_name = this.state.user_name;
    message.sender = this.state.user;
    message.item = this.state.item;
    message.user._id = this.state.user;
    message.user.name = this.state.user_name;

    return message;

  };

  onSend(messages = []) {

    let msgObj = this.makeMsg(messages[0]);
    console.tron.log(msgObj);
    this.props.requestMessagePost(msgObj);
    this.setState((previousState) => {
      console.tron.log(messages);

      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }


  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.containertwo}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={{_id: this.state.buyer}}
          />
        </View>
      </ScrollView>
    )
  }

}

ChatDetail.propTypes = {

  requestMessagePost: PropTypes.func,
  building: PropTypes.string,
  user: PropTypes.string,
  user_name: PropTypes.string

};

const mapStateToProps = (state) => {
  return {

    user: state.login.username._id.$oid,
    building: state.login.username.building,
    user_name: state.login.username.first_name

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    requestMessagePost: (params) => dispatch(MessagePostActions.messagePostRequest(params))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetail)
