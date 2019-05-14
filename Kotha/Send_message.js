import React,{Component} from "react";
import {View,Text,TextInput,StyleSheet,Picker,ScrollView,FlatList,Alert,AsyncStorage} from "react-native";
import {Button,Avatar} from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,

} from 'react-native-admob';
export default class Send_message extends Component{

    constructor(props)
    {
        super(props);

        this.state={
            receiver:"",
            message:"",
            spinner_visible:false,
            sender:"",
            usernames:[],
            selected_username:"",
        };
        receiver="";
        message="";
        this.send_button = this.send_button.bind(this);
        this._retrieveData = this._retrieveData.bind(this);
        this.get_all_users = this.get_all_users.bind(this);

    }

    componentWillMount()
    {
        this.get_all_users();
    }
    get_all_users() {
        this.setState({spinner_visible:true});

        fetch("http://taohidulislam.pythonanywhere.com/all_users/",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                username :this.state.sender,

            }),
        }).then((response) =>
            response.json())
            .then((responseJson) => {
                all_texts = responseJson.all_users;
                all_texts.splice(0, 0, "Select Receiver");
                if(all_texts.length>0)
                {
                    this.setState({usernames: all_texts,spinner_visible:false});

                }
                if (all_texts.length==0){
                    this.setState({empty_text: "No User Found"})
                }

            });
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
        receiver="";
        message="";
        this._retrieveData();
    }
    send_button()
    {
        try {
            if (this.message.length == 0 || this.state.selected_username.length == 0 ||this.state.selected_username=="Select Receiver") {
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
                        receiver: this.state.selected_username,
                        message: this.message,
                    }),
                }).then((response) =>
                    response.json())
                    .then((responseJson) => {
                        this.setState({spinner_visible:false});
                        response_text = responseJson.response_text;

                        if (response_text == "error") {
                            Alert.alert(
                                'Ops!',
                                "Please fill up all the fields correctly.Don't use emoticons for now!",
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
                            this.setState({message:"",receiver:"",selected_username:"Select Receiver"});
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

                            <Picker
                                selectedValue={this.state.selected_username}
                                style={{ height: 50,}}
                                onValueChange={(itemValue, itemIndex) => this.setState({selected_username: itemValue})}>
                                {this.state.usernames.map((item, index) => {
                                    return (< Picker.Item label={item} value={item} key={index} />);
                                })}
                            </Picker>

                            {/*<TextInput placeholder="Enter Username" value={this.state.receiver}*/}
                                       {/*onChangeText={(receiver) => { this.setState({ receiver:receiver }); this.receiver=receiver; }}*/}
                            {/*/>*/}
                        </View>

                    </View>
                    {/*<Avatar*/}
                        {/*large*/}
                        {/*rounded*/}
                        {/*source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}*/}
                        {/*onPress={() => console.log("Works!")}*/}
                        {/*activeOpacity={0.7}*/}
                    {/*/>*/}
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

                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-2782059942193503/2183033142"
                        testDevices={[AdMobBanner.simulatorId]}

                    />
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-2782059942193503/1782727838"
                        testDevices={[AdMobBanner.simulatorId]}

                    />
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-2782059942193503/9887931642"
                        testDevices={[AdMobBanner.simulatorId]}

                    />
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-2782059942193503/5526122607"
                        testDevices={[AdMobBanner.simulatorId]}

                    />


                </ScrollView>

            </View>
        )
    }
}