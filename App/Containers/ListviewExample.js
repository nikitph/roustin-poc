// @flow

import React, {PropTypes} from 'react'
import {View, Text, ListView, Image} from 'react-native'
import { connect } from 'react-redux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ListviewExampleStyle'

class ListviewExample extends React.Component {

  state: {

    dataSource: Object,
    isfetching: false,
    user: null

  };

  constructor (props) {
    super(props);
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    const dataObjects = props.item_data;

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
    }
  }

  /* ***********************************************************
  * STEP 3
  * `renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  renderRow (rowData) {
    console.tron.log(rowData.image);
    let img = 'http://127.0.0.1:5000/' + rowData.image;
    return (
      <View style={styles.row}>
        <Image source={{uri: img}} style={{width:40, height:40, borderRadius:20}}/>
        <View style={{justifyContent:'flex-end', padding:5}}>
          <Text style={styles.label}>{rowData.details}</Text>
        </View>
      </View>
    )
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this.noRowData()} />
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

ListviewExample.propTypes = {

  isfetching: PropTypes.bool,
  item_data: PropTypes.array

};

const mapStateToProps = (state) => {

  console.log(state.item);
  return {

    isfetching: state.item.fetching,
    item_data: state.item.payload._items
  }
}

export default connect(mapStateToProps)(ListviewExample)
