// @flow

import React from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView,
  View,
  Image,
  NativeModules,
  DeviceEventEmitter,
  ActivityIndicator,
  CameraRoll,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Metrics} from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import {Actions as NavigationActions} from 'react-native-router-flux'

// Styles
import styles from './Styles/ImageUploadStyle'

// I18n
import I18n from 'react-native-i18n'

let RNUploader = NativeModules.RNUploader;


class ImageUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      showUploadModal: false,
      uploadProgress: 0,
      uploadTotal: 0,
      uploadWritten: 0,
      uploadStatus: undefined,
      cancelled: false,
      images: [],
    }
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('RNUploaderProgress', (data) => {
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal = data.totalBytesExpectedToWrite;
      let progress = data.progress;
      this.setState({uploadProgress: progress, uploadTotal: bytesTotal, uploadWritten: bytesWritten});
    });
  }

  _addImage() {
    const fetchParams = {
      first: 25,
    };

    CameraRoll.getPhotos(fetchParams).then(
      (data) => {
        const assets = data.edges;
        const index = parseInt(Math.random() * (assets.length));
        const randomImage = assets[index];

        let images = this.state.images;
        images.push(randomImage.node.image);

        this.setState({images: images});
      },
      (err) => {
        console.log(err);
      });
  }

  _closeUploadModal() {
    this.setState({
      showUploadModal: false,
      uploadProgress: 0,
      uploadTotal: 0,
      uploadWritten: 0,
      images: [],
      cancelled: false,
    });
  }

  _cancelUpload() {
    RNUploader.cancel();
    this.setState({uploading: false, cancelled: true});
  }

  _uploadImages() {
    let files = this.state.images.map((file) => {
      return {
        name: 'file',
        filename: _generateUUID + '.png',
        filepath: file.uri,
        filetype: 'image/png',
      }
    });

    let opts = {
      url: 'https://posttestserver.com/post.php',
      files: files,
      params: {name: 'test-app'}
    };

    this.setState({uploading: true, showUploadModal: true,});
    RNUploader.upload(opts, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      let status = res.status;
      let responseString = res.data;

      console.log('Upload complete with status ' + status);
      console.log(responseString);
      this.setState({uploading: false, uploadStatus: status});
    });

  }

  uploadProgressModal() {
    let uploadProgress;

    if (this.state.cancelled) {
      uploadProgress = (
        <View style={{ margin: 5, alignItems: 'center', }}>
          <Text style={{ marginBottom: 10, }}>
            Upload Cancelled
          </Text>
          <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (!this.state.uploading && this.state.uploadStatus) {
      uploadProgress = (
        <View style={{ margin: 5, alignItems: 'center', }}>
          <Text style={{ marginBottom: 10, }}>
            Upload complete with status: { this.state.uploadStatus }
          </Text>
          <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
            <Text>{ this.state.uploading ? '' : 'Close' }</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.uploading) {
      uploadProgress = (
        <View style={{ alignItems: 'center', }}>
          <Text style={ styles.title }>Uploading { this.state.images.length }
            Image{ this.state.images.length == 1 ? '' : 's' }</Text>
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large"/>
          <Text>{ this.state.uploadProgress.toFixed(0) }%</Text>
          <Text style={{ fontSize: 11, color: 'gray', marginTop: 5, }}>
            { ( this.state.uploadWritten / 1024 ).toFixed(0) }/{ ( this.state.uploadTotal / 1024 ).toFixed(0) } KB
          </Text>
          <TouchableOpacity style={ [styles.button, {marginTop: 5}] } onPress={ this._cancelUpload.bind(this) }>
            <Text>{ 'Cancel' }</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return uploadProgress;
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          react-native-uploader example
        </Text>

        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.showUploadModal}>

          <View style={styles.modal}>
            {this.uploadProgressModal()}
          </View>

        </Modal>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={this._addImage.bind(this)}>
            <Text>Add Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this._uploadImages.bind(this)}>
            <Text>Upload</Text>
          </TouchableOpacity>

        </View>

        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.state.images.map((image) => {
            return <Image key={_generateUUID()} source={{uri: image.uri}} style={styles.thumbnail}/>
          })}
        </View>

      </View>
    );
  }

}

function _generateUUID() {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)
