import React,{Component} from "react";
import {View,Text,TextInput,StyleSheet,Picker,ScrollView,FlatList,Alert,AsyncStorage} from "react-native";
import {Button} from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

export default class Send_message_from_all_users extends Component{

    constructor(props)
    {
        super(props);

        this.state={
            receiver:this.props.navigation.state.params.username,
            message:"",
            spinner_visible:false,
            sender:"",
        };
        receiver=this.props.navigation.state.params.username;
        message="";
        this.send_button = this.send_button.bind(this);
        this._retrieveData = this._retrieveData.bind(this);

    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                this.setState({sender:value});
            }
            else{
                this.props.navigation.navigate("Sign_up");
            }
        } catch (error) {
            this.props.navigation.navigate("Sign_up");
            // Error retrieving data
        }
    }

    componentDidMount()
    {
        this.receiver=this.props.navigation.state.params.username;
        message="";
        this._retrieveData();
    }
    send_button()
    {
        try {
            if (this.message.length == 0 || this.receiver.length == 0) {
                Alert.alert(
                    'Ops!',
                    "Please fill up all the fields correctly",
                    [

                        {
                            text: 'OK', onPress: () => {
                            }
                        },
                    ],
                    {cancelable: true}
                )
            }
            else {
                this.setState({spinner_visible:true});
                fetch('http://taohidulislam.pythonanywhere.com/send_message/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sender: this.state.sender,
                        receiver: this.receiver,
                        message: this.message,
                    }),
                }).then((response) =>
                    response.json())
                    .then((responseJson) => {
                        this.setState({spinner_visible:false});
                        response_text = responseJson.response_text;

                        if (response_text == "error") {
                            Alert.alert(
                                'Successful!',
                                "Please fill up all the fields correctly. Only English letters are supported.",
                                [

                                    {
                                        text: 'OK', onPress: () => {
                                        }
                                    },
                                ],
                                {cancelable: true}
                            )

                        }
                        else if (response_text == "block") {
                            Alert.alert(
                                'Ops!',
                                'Sorry, you cannot send message to this user.',
                                [

                                    {
                                        text: 'OK', onPress: () => {
                                        }
                                    },
                                ],
                                {cancelable: true}
                            )
                        }
                        else if (response_text == "no receiver") {
                            Alert.alert(
                                'Ops!',
                                'No receiver found with this username',
                                [

                                    {
                                        text: 'OK', onPress: () => {
                                        }
                                    },
                                ],
                                {cancelable: true}
                            )
                        }
                        else if (response_text == "successful") {
                            Alert.alert(
                                'Successful!',
                                'Successfully your message sent',
                                [

                                    {
                                        text: 'OK', onPress: () => {
                                        }
                                    },
                                ],
                                {cancelable: true}
                            );
                            this.setState({message:"",receiver:""});
                            this.message="";
                            this.receiver="";
                        }
                    });
            }
        }
        catch (e) {
            Alert.alert(
                'Successful!',
                "Please fill up all the fields correctly",
                [

                    {
                        text: 'OK', onPress: () => {
                        }
                    },
                ],
                {cancelable: true}
            )
        }
    }
    render()
    {
        return(
            <View>

                <ScrollView>
                    <Spinner visible={this.state.spinner_visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} cancelable={true} />

                    <Text style={{textAlign:"center",fontWeight:"bold",paddingTop:10,paddingBottom:20,fontSize:30,color:"rgb(8, 71, 98)"}}>Send Message</Text>
                    <View style={{ flexDirection: "row" ,paddingTop:20,paddingBottom:20}}>

                        <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10 }}>
                            <Text>Receiver : </Text>
                        </View>

                        <View style={{ flex: 3 }}>
                            <TextInput placeholder="Enter Username" value={this.state.receiver}
                                       onChangeText={(receiver) => { this.setState({ receiver:receiver }); this.receiver=receiver; }}
                            />
                        </View>

                    </View>
                    <TextInput placeholder="Enter Your Message Here" value={this.state.message} key={"key"} onChangeText={(message) => {
                        this.message = message;
                        this.setState({ message: message })
                    }} multiline={true} />
                    <Text style={{paddingBottom:20}}></Text>
                    <View style={{ alignItems: "center", justifyContent: "center" ,paddingBottom: 20 }}>
                        <Button titleStyle={{ fontWeight: "1000", }} buttonStyle={{
                            paddingTop: this.padding,
                            borderRadius: 5, width: 200, height: 45, backgroundColor: "rgb(8, 71, 98)", paddingTop: 5,
                            minHeight:40
                        }} onPress={()=>this.send_button()} title="SEND"  />
                    </View>

                </ScrollView>

            </View>
        )
    }
}