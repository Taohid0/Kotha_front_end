
import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,Button,
} from 'react-native';
import {StackNavigator} from "react-navigation";
import {DrawerNavigator} from "react-navigation";
import Sign_up from "./Sign_up";
import All_messages from "./All_messages";
import Message_details from "./Message_details";
import Send_message from "./Send_message";
import Reply from "./Reply";
import Outbox from "./Outbox";
import SplashScreen from "react-native-smart-splash-screen";
import Logout from "./Logout";
import All_users from "./All_users";
import Send_message_from_all_users from "./Send_message_from_all_users";

console.disableYellowBox = true;

type Props = {};
export default class App extends Component<Props> {

    componentDidMount()
    {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 500,
            delay: 500,
        });

    }
  render() {
    return (
      <Drawer_navigation/>
    );
  }
}


const Drawer_navigation = DrawerNavigator({

    All_messages:{
        screen:All_messages,
        navigationOptions: {
            drawerLabel: () => "Inbox",
        }},
    Outbox:{
        screen:Outbox,
        navigationOptions:{
            drawerLabel:()=>"Outbox",
        }
    },
    All_users:{
        screen:All_users,
        navigationOptions:{
            drawerLabel:()=>"All Users"
        }
    },
    Message_details:{
        screen:(props) =><Message_details  {...props} propName={'message,user_id'} />,
        navigationOptions:{
        drawerLabel:()=>null,
    }},
    Send_message:{
        screen:Send_message,
        navigationOptions:{
            drawerLabel:()=>"Send Message",
        }
    },
    Send_message_from_all_users:{
        screen:(props)=><Send_message_from_all_users {...props} propName={"username"}/>,
        navigationOptions:{
            drawerLabel:()=>null,
        }
    },
    Reply:{
        screen:(props) =><Reply  {...props} propName={'user_id,message'} />,
        navigationOptions:{
            drawerLabel:()=>null,
        }
    },
    Sign_up:{
        screen:Sign_up,
        navigationOptions:{
            drawerLabel:()=>null,
        }
    },
    Logout:{
        screen:Logout,
        navigationOptions:{
            drawerLabel:()=>"Logout"
        }
    }


});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
