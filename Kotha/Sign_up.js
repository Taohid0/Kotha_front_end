import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Picker ,ScrollView,Alert} from "react-native";
import { Button } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import { StackNavigator } from "react-navigation";

export default class Sign_up extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username_login:"",
            password_login:"",
            username_sign_up:"",
            password_sign_up:"",
            confirm_password:"",
            age:"",
            spinner_visible:false,
        };
        username_login="";
        password_login="";
        username_sign_up="";
        password_sign_up="";
        confirm_password="";
        age="";
        this.login_button = this.login_button.bind(this);
        this.sign_up_button = this.sign_up_button.bind(this);
        this.check_age = this.check_age.bind(this);

    }

    componentDidMount()
    {
        username_login="";
        password_login="";
        username_sign_up="";
        password_sign_up="";
        confirm_password="";
        age="";
    }

    login_button()
    {
        this.setState({spinner_visible:true});
        fetch('http://5445b8f5.ngrok.io/login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.username_login,
                password:this.password_login,
            }),
        }).then((response) =>
            response.json())
            .then((responseJson) => {
                this.setState({spinner_visible:false});
                response_text = responseJson.response_text;

                if(response_text=="error")
                {
                    alert("Please enter all data correctly")
                }
                else if(response_text=="mismatched")
                {
                    Alert.alert(
                        'Ops!',
                        'Username and password mismatched',
                        [

                            {text: 'OK', onPress: () => {}},
                        ],
                        { cancelable: true }
                    )
                }
                else if(response_text=="successful")
                {
                    Alert.alert(
                        'Successful!',
                        'Successfully Logged in',
                        [

                            {text: 'OK', onPress: () => {}},
                        ],
                        { cancelable: true }
                    )
                }
            });
    }
    check_age()
    {

        try {
            let age_value = parseInt(this.age);

            if(isNaN(age_value)|| age_value<18 )
            {
                return true;
            }
            else
                return false;
        }
        catch (e) {
            return true
        }
    }
    sign_up_button()
    {
        if (this.password_sign_up!==this.confirm_password)
        {
            Alert.alert(
                'Ops!',
                'Password and Confirm Password Mismatched',
                [

                    {text: 'OK', onPress: () => {}},
                ],
                { cancelable: true }
            )
        }
        else if(this.check_age())
        {
            Alert.alert(
                'Ops!',
                'you must be at least 18 years old',
                [

                    {text: 'OK', onPress: () => {}},
                ],
                { cancelable: true }
            )
        }
        else
        {
            if(this.username_sign_up.length>0) {
                this.setState({spinner_visible:true});
                fetch('http://5445b8f5.ngrok.io/sign_up/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.username_sign_up,
                        age: this.age,
                        password_login: this.username_sign_up,
                    }),
                }).then((response) =>
                    response.json())
                    .then((responseJson) => {
                        this.setState({spinner_visible:false});
                        response_text = responseJson.response_text;
                        if(response_text=="error")
                        {
                            Alert.alert(
                                'Ops!',
                                'Please enter all data correctly',
                                [

                                    {text: 'OK', onPress: () => {}},
                                ],
                                { cancelable: true }
                            );
                        }
                        else if(response_text=="duplicate")
                        {
                            Alert.alert(
                                'Ops!',
                                'This username already exists, please try another one',
                                [

                                    {text: 'OK', onPress: () => {}},
                                ],
                                { cancelable: true }
                            )
                        }
                        else if(response_text=="successful")
                        {
                            Alert.alert(
                                'Successful!',
                                'Successfully Signed in',
                                [

                                    {text: 'OK', onPress: () => {}},
                                ],
                                { cancelable: true }
                            )
                        }
                    });
            }
            else{
                Alert.alert(
                    'Ops!',
                    'Enter Username Correctly',
                    [

                        {text: 'OK', onPress: () => {}},
                    ],
                    { cancelable: true }
                )
            }

        }
    }

    render() {
        return (
            <View style={{backgroundColor: '#F5FCFF'}}>
            <ScrollView style={{backgroundColor: '#F5FCFF'}}>
                <Spinner visible={this.state.spinner_visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} cancelable={true} />

                <View style={{ flexDirection: "row" }}>

                    <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10 }}>
                        <Text>Username : </Text>
                    </View>

                    <View style={{ flex: 3 }}>
                        <TextInput placeholder="Enter Username"
                                   onChangeText={(username) => { this.setState({ username_login:username }); this.username_login=username; }}
                        />
                    </View>

                </View>


                <View style={{ flexDirection: "row" }}>

                    <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10 }}>
                        <Text>Password : </Text>
                    </View>

                    <View style={{ flex: 3 }}>
                        <TextInput placeholder="Enter Password" password={true}
                                   onChangeText={(password) => {
                                       this.setState({ password_login: password });
                                       this.password_login = password;
                                   }} secureTextEntry={true}
                        />
                    </View>

                </View>



                <Text style={{ paddingTop: 10 }} />

                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Button titleStyle={{ fontWeight: "1000", }} buttonStyle={{
                        paddingTop: this.padding, paddingBottom: this.padding,
                        borderRadius: 5, width: 200, height: 45, backgroundColor: "rgb(8, 71, 98)", paddingTop: 5
                    }} title="Login"  onPress={()=>this.login_button()} />
                </View>

                <Text style={{textAlign:"center",fontSize:30,paddingTop:20,paddingBottom:20,color:"rgb(179, 14, 9)"}}>OR</Text>
                <View style={{ flexDirection: "row" }}>

                <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10 }}>
                    <Text>Username : </Text>
                </View>

                <View style={{ flex: 3 }}>
                    <TextInput placeholder="Enter Username"
                               onChangeText={(username) => { this.setState({ username_sign_up: username }); this.username_sign_up = username; }}
                    />
                </View>

            </View>


                <View style={{ flexDirection: "row" }}>

                    <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10 }}>
                        <Text>Age : </Text>
                    </View>

                    <View style={{ flex: 3 }}>
                        <TextInput placeholder="Enter Age (Year)"
                                   onChangeText={(age) => { this.setState({ age: age }); this.age = age; }}
                        />
                    </View>

                </View>
                <View style={{ flexDirection: "row" }}>

                    <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10 }}>
                        <Text>Password : </Text>
                    </View>

                    <View style={{ flex: 3 }}>
                        <TextInput placeholder="Enter Password" password={true}
                                   onChangeText={(password) => {
                                       this.setState({ password_sign_up: password });
                                       this.password_sign_up = password;
                                   }} secureTextEntry={true}
                        />
                    </View>

                </View>
                <View style={{ flexDirection: "row" }}>

                    <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10 }}>
                        <Text>Confirm Password : </Text>
                    </View>

                    <View style={{ flex: 3 }}>
                        <TextInput placeholder="Confirm Password" password={true}
                                   onChangeText={(password) => {
                                       this.setState({ confirm_password: password });
                                       this.confirm_password = password;
                                   }} secureTextEntry={true}
                        />
                    </View>

                </View>




                <Text style={{ paddingTop: 10 }} />

                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Button titleStyle={{ fontWeight: "1000", }} buttonStyle={{
                        paddingTop: this.padding, paddingBottom: this.padding,
                        borderRadius: 5, width: 200, height: 45, backgroundColor: "rgb(8, 71, 98)", paddingTop: 5
                    }} onPress={()=>this.sign_up_button()} title="SIGN UP"  />
                </View>
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