// @flow

import React, {Component} from 'react'
import {Scene, Router, Modal} from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import AllComponentsScreen from '../Containers/AllComponentsScreen'
import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
import LoginScreen from '../Containers/LoginScreen'
import ListviewExample from '../Containers/ListviewExample'
import ListviewGridExample from '../Containers/ListviewGridExample'
import ListviewSectionsExample from '../Containers/ListviewSectionsExample'
import ListviewSearchingExample from '../Containers/ListviewSearchingExample'
import MapviewExample from '../Containers/MapviewExample'
import APITestingScreen from '../Containers/APITestingScreen'
import ThemeScreen from '../Containers/ThemeScreen'
import DeviceInfoScreen from '../Containers/DeviceInfoScreen'
import TownshipInputScreen from "../Containers/TownshipInputScreen";
import ItemInput from '../Containers/ItemInput'
import HomeScreen from "../Containers/HomeScreen";
import ItemDetailScreen from "../Containers/ItemDetailScreen";
import ItemChatScreen from "../Containers/ItemChatScreen";
import MyItems from "../Containers/MyItems";
import ConfirmationPage from "../Containers/ConfirmationPage";
import ImageUpload from "../Containers/ImageUpload";
import MessageListView from "../Containers/MessageListView";
import ChatDetail from "../Containers/ChatDetail";

import {Actions as NavigationActions} from 'react-native-router-flux'
import {Images} from '../Themes'
import WalkThroughScreen from "../Containers/WalkThroughScreen";
import * as ActionConst from "react-native-router-flux";

/* **************************
 * Documentation: https://github.com/aksonov/react-native-router-flux
 ***************************/

class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title}
                 leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='presentationScreen' component={PresentationScreen} title='Ignite'
                   renderLeftButton={NavItems.hamburgerButton}/>
            <Scene key='componentExamples' component={AllComponentsScreen} title='Components'/>
            <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example'
                   onRight={() => window.alert('Example Pressed')}/>
            <Scene key="loginModal" component={Modal} direction={"vertical"}>
              <Scene key='login' component={LoginScreen} title='Login' hideNavBar/>
            </Scene>
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example'/>
            <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid'/>
            <Scene key='listviewSectionsExample' component={ListviewSectionsExample} title='Listview Sections'/>
            <Scene key='listviewSearchingExample' component={ListviewSearchingExample} title='Listview Searching'
                   navBar={CustomNavBar}/>
            <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example'/>
            <Scene key='apiTesting' component={APITestingScreen} title='API Testing'/>
            <Scene key='townshipInput' component={TownshipInputScreen} title='Theme'/>
            <Scene key='itemInput' component={ItemInput} title='Theme'/>
            <Scene key='homeScreen' component={HomeScreen} type={ActionConst.RESET} navBar={CustomNavBar}/>
            <Scene key='itemDetail' component={ItemDetailScreen} title='Theme'/>
            <Scene key='itemChat' component={ItemChatScreen} title='Theme'/>
            <Scene key='myItems' component={MyItems} title='My Items on Sale' rightTitle='New'
                   onRight={()=>NavigationActions.itemInput()}/>
            <Scene key="modal" component={Modal} direction={"vertical"}>
              <Scene key='confPage' component={ConfirmationPage} title='Theme' direction={"vertical"}/>
            </Scene>
            {/* Custom navigation bar example */}
            <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info'/>
            <Scene key='messageList' component={MessageListView} title='Message List'/>
            <Scene key='chatDetail' component={ChatDetail} title='Message List'/>
            <Scene key='deviceInfor' component={ImageUpload} title='Device Info'/>
            <Scene initial key='walk' component={WalkThroughScreen} hideNavBar/>

          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
