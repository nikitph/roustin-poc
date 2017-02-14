// @flow

import React, {PropTypes} from 'react'
import {View, Text, ListView, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
// import { Actions as NavigationActions } from 'react-native-router-flux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/MessageListViewStyle'
import {Images} from '../Themes'
import _ from 'lodash'


class MessageListView extends React.Component {

  state: {
    dataSource: Object,
    isfetching: false,
    user: null
  };

  constructor(props) {
    super(props);

    /* ***********************************************************
     * STEP 1
     * This is an array of objects with the properties you desire
     * Usually this should come from Redux mapStateToProps
     *************************************************************/
    let dataObjects = props.message_data.filter(function (el) {
      return el.buyer === props.user || el.seller === props.user;
    });
    console.tron.log(dataObjects);


    dataObjects = _.map(dataObjects, function (elm) {
      return _.pick(elm, 'buyer', 'seller', 'item', 'buyer_name', 'seller_name');
    });
    dataObjects = _.uniqWith(dataObjects, _.isEqual);

    /* ***********************************************************
     * STEP 2
     * Teach datasource how to detect if rows are different
     * Make this function fast!  Perhaps something like:
     *   (r1, r2) => r1.id !== r2.id}
     *************************************************************/
    const rowHasChanged = (r1, r2) => {
      let d = (r1.seller !== r2.seller) && (r1.item !== r2.item);
      console.tron.log(d);
      return d
    };

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      user: props.user
    }
  }

  static onPressButton = () => {
    console.tron.log('yup');
    NavigationActions.deviceInfo();
  }

  /* ***********************************************************
   * STEP 3
   * `renderRow` function -How each cell/row should be rendered
   * It's our best practice to place a single component here:
   *
   * e.g.
   return <MyCustomCell title={rowData.title} description={rowData.description} />
   *************************************************************/
  renderRow(rowData) {
    console.tron.log(rowData);

    onPressButton = (rowdata) => {
      let messages = this.props.message_data.filter(function (el) {
        return el.buyer === rowdata.buyer && el.seller === rowdata.seller && el.item === rowdata.item;
      });
      NavigationActions.itemChat({messages: messages});
    };

    let img = 'http://127.0.0.1:5000/' + rowData.image;
    return (
      <TouchableOpacity onPress={() => onPressButton(rowData)}>

        <View style={styles.row}>
          <Image source={{uri: img}} style={{ flex:0.15, width:60, height:60}}/>
          <View style={{justifyContent:'flex-start', padding:5, flex:0.65}}>
            <Text
              style={{fontFamily:'AvenirNext-UltraLight', fontSize:12, fontWeight:'300'}}>{rowData.seller_name}</Text>
            <Text
              style={{fontFamily:'AvenirNext-UltraLight', fontSize:12, fontWeight:'100'}}>{rowData.item}, {rowData.buyer_name}</Text>
          </View>
          <Image source={Images.rupee}
                 style={{ flex:0.15,  resizeMode:'contain',width:60, height:60, opacity:0.4, justifyContent:'center'}}>
            <Text
              style={{fontFamily:'AvenirNext-UltraLight', fontSize:18, fontWeight:'400', color:'red', backgroundColor:'transparent'}}>{rowData.buyer}</Text>
          </Image>
        </View>
      </TouchableOpacity>
    )
  }


  noRowData() {
    return this.state.dataSource.getRowCount() === 0
  }

  render() {
    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this.noRowData()}/>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          pageSize={15}
        />
      </View>
    )
  }
}

MessageListView.propTypes = {

  isfetching: PropTypes.bool,
  message_data: PropTypes.array,
  user: PropTypes.string

};

const mapStateToProps = (state) => {

  console.log(state.item);
  return {

    isfetching: state.message.fetching,
    message_data: state.message.payload,
    user: state.login.username._id.$oid

  }
};

export default connect(mapStateToProps)(MessageListView)
