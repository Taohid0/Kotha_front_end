import React,{Component} from "react";
import {View,Text,TextInput,StyleSheet,Picker,ScrollView,FlatList,Alert} from "react-native";
import {Button} from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
export default class All_messages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            all_messages: [],
        };
        this.get_all_messages = this.get_all_messages.bind(this);

    }
    componentDidMount()
    {
    this.get_all_messages();
    }

    get_all_messages() {
        this.setState({spinner_visible:true});

        fetch("http://5445b8f5.ngrok.io/my_all_messages/",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                username :"taohid",

            }),
        }).then((response) =>
                response.json())
            .then((responseJson) => {
                all_texts = responseJson.all_texts;
                this.setState({all_messages: all_texts,spinner_visible:false});

            });
    }


    render()
    {
        return(
            <View>

                <ScrollView>
                    <Spinner visible={this.state.spinner_visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} cancelable={true} />
                    <Text style={{textAlign:"center",fontWeight:"bold",paddingTop:10,paddingBottom:20,fontSize:30,color:"rgb(8, 71, 98)"}}>All Messages</Text>
                    <FlatList
                        data={this.state.all_messages}
                        renderItem={({item,index}) => <Text onPress = {()=>this.props.navigation.navigate("Message_details",{message:item[0],user_id:item[1]} )} style={{
                            paddingTop:10,paddingBottom:10,paddingLeft:10,
                            borderBottomColor:"white",borderBottomWidth:3,backgroundColor:"#F2F4F4"}} >{item[0]}</Text>}
                    />
                </ScrollView>

            </View>
        )
    }
}