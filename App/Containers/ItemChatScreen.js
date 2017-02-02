// @flow

import React from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
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
      messages: [],
      seller: null,
      buyer: null
    };
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: this.props.data.price,
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
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

const mapStateToProps = (state) => {
  return {

    seller: state.item.user,
    buyer: state.login.username._id.$oid

  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemChatScreen)
