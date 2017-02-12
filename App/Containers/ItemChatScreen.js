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

// Styles
import styles from './Styles/ItemChatScreenStyle'

// I18n
import I18n from 'react-native-i18n'
import {GiftedChat} from 'react-native-gifted-chat';


class ItemChatScreen extends React.Component {
  constructor(props: Object) {
    super(props);
    console.tron.log(props);
    this.state = {
      item_data: props.data,
      messages: props.messages.payload,
      seller: props.data.user,
      seller_name: props.data.user_name,
      buyer: props.buyer,
      buyer_name: props.buyer_name
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
    message.sender_name = this.state.buyer_name;
    message.sender = this.state.buyer;
    message.item = this.state.item_data._id;
    message.user._id = this.state.buyer;
    message.user.name = this.state.buyer_name;

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
            messages={this.state.messages.filter((value)=> (value.buyer == this.state.buyer) && (value.item == this.state.item_data._id))}
            onSend={this.onSend}
            user={{_id: this.state.buyer}}
          />
        </View>
      </ScrollView>
    )
  }

}

ItemChatScreen.propTypes = {

  requestMessageGet: PropTypes.func,
  requestMessagePost: PropTypes.func,
  building: PropTypes.string,
  user: PropTypes.string,
  buyer: PropTypes.string,
  buyer_name: PropTypes.string

};

const mapStateToProps = (state) => {
  return {

    buyer: state.login.username._id.$oid,
    messages: state.message,
    building: state.login.username.building,
    buyer_name: state.login.username.first_name

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    requestMessageGet: (params) => dispatch(MessageGetActions.messageGetRequest(params)),
    requestMessagePost: (params) => dispatch(MessagePostActions.messagePostRequest(params))

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemChatScreen)
