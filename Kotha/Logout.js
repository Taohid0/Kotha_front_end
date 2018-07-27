import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Picker ,ScrollView,Alert,AsyncStorage} from "react-native";
import { Button } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import { StackNavigator } from "react-navigation";
import SplashScreen from 'react-native-smart-splash-screen';


export default class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:"",
            spinner_visible:false,
        };
        username="";
        this._retrieveData = this._retrieveData.bind(this);
        this.logout();
        this._remove = this._remove.bind(this);

    }

    componentDidMount()
    {
    this.username="";
    this._retrieveData();

    }
    _remove = async () => {
        try {
             AsyncStorage.clear();
        } catch (error) {
            //this.props.navigation.navigate("Sign_up");
        }
    };
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                this.username=value;
                this.logout();
            }
            else{
                this.props.navigation.navigate("Sign_up");
            }
        } catch (error) {
            this.props.navigation.navigate("Sign_up");
            // Error retrieving data
        }
    }

    logout()
    {
        this.setState({spinner_visible:true});
        fetch('http://taohidulislam.pythonanywhere.com/logout/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.username,
            }),
        }).then((response) =>
            response.json())
            .then((responseJson) => {
                this.setState({spinner_visible:false});
                response_text = responseJson.response_text;

                if(response_text=="error")
                {
                    alert("Something went wrong. Please try again")
                }
                else if(response_text=="successful")
                {

                    this._remove();
                    Alert.alert(
                        'Successful!',
                        'Successfully Logged out',
                        [

                            {text: 'OK', onPress: () => {}},
                        ],
                        { cancelable: true }
                    )
                    this.props.navigation.navigate("Sign_up");
                }
            });
    }


    render() {
        return (
            <View style={{backgroundColor: '#F5FCFF'}}>
                <ScrollView style={{backgroundColor: '#F5FCFF'}}>
                    <Spinner visible={this.state.spinner_visible} textContent={"Logging out..."} textStyle={{ color: '#FFF' }} cancelable={true} />
                </ScrollView>
            </View>
        );
    }
}
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