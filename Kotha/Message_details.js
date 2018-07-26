import React,{Component} from "react";
import {View,Text,TextInput,StyleSheet,Picker,ScrollView,FlatList,Alert} from "react-native";
import {Button} from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
export default class Message_details extends Component{

    constructor(props)
    {
        super(props);

        this.state={
            message:"",
            task :"Loading...",
            spinner_visible:false,
        };
        this.block_sender = this.block_sender.bind(this);
        this.reply_button = this.reply_button.bind(this);
        this.check_block = this.check_block.bind(this);

    }
    componentWillMount()
    {
        this.check_block();
    }
    check_block()
    {
        this.setState({spinner_visible:true});
        fetch('http://5445b8f5.ngrok.io/check_block/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: "taohid",
                blocked_id:this.props.navigation.state.params.user_id,
            }),
        }).then((response) =>
            response.json())
            .then((responseJson) => {

                response_text = responseJson.response_text;
                if (response_text==1)
                {
                    this.setState({task:"Unblock Sender",spinner_visible:false})
                }
                else{
                    this.setState({task:"Block Sender",spinner_visible:false})
                }
            });
    }

    block_sender()
    {
        fetch('http://5445b8f5.ngrok.io/block/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task:this.state.task,
                username: "taohid",
                blocked_id:this.props.navigation.state.params.user_id,
            }),
        }).then((response) =>
            response.json())
            .then((responseJson) => {
                response_text = responseJson.response_text;
                if(response_text=="error")
                {
                    alert("Something went wrong")
                }
                else if(response_text=="successful")
                {
                    if(this.state.task=="Block Sender")
                    {
                    Alert.alert(
                        'Blocked!',
                        'Successfully blocked this message sender',
                        [

                            {text: 'OK', onPress: () => {}},
                        ],
                        { cancelable: true }
                    )}
                    else{
                        Alert.alert(
                            'Unblocked!',
                            'Successfully unblocked this message sender',
                            [

                                {text: 'OK', onPress: () => {}},
                            ],
                            { cancelable: true }
                        )
                    }
                    this.props.navigation.navigate("All_messages")
                }
            });
    }
reply_button()
{
    this.props.navigation.navigate("Reply",{user_id:this.props.navigation.state.params.user_id,message:this.props.navigation.state.params.message});
}
    render()
    {
        return(
            <View style={{backgroundColor:"#F5FCFF"}}>
                <ScrollView style={{backgroundColor:"#F5FCFF"}}>
                    <Spinner visible={this.state.spinner_visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} cancelable={true} />
                    <Text style={{paddingTop:10,textAlign:"center",fontSize:40,color:"rgb(8, 71, 98)"}}>Kotha</Text>
                    <Text style={{paddingTop:20,paddingBottom:50,textAlign:"center",fontSize:20}}>{this.props.navigation.state.params.message}</Text>

                    <View style={{ flexDirection: "row" }}>

                        <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10 }}>
                            <Button buttonStyle={{backgroundColor:"#EA5858"}} title={this.state.task} onPress={()=>this.block_sender()}/>
                        </View>

                        <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10 }}>
                            <Button buttonStyle={{backgroundColor:"#216CCE"}} title="Reply" onPress={()=>this.reply_button()}/>
                        </View>

                    </View>

                </ScrollView>

            </View>
        )
    }
}