import React,{Component} from "react";
import {View, Text, TextInput, StyleSheet, Picker, ScrollView, FlatList, Alert, AsyncStorage} from "react-native";
import {Button} from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

export default class All_messages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            all_messages: [],
            sender:"",
            empty_text:"",
        };
        this.get_all_messages = this.get_all_messages.bind(this);
        this._retrieveData =this._retrieveData.bind(this);

    }
    componentDidMount()
    {

    this._retrieveData();
    }
    _retrieveData = async () => {

        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                this.setState({sender:value});
                this.get_all_messages();
            }
            else{
                this.props.navigation.navigate("Sign_up");
            }
        } catch (error) {
            this.props.navigation.navigate("Sign_up");
            // Error retrieving data
        }
    }
    get_all_messages() {
        this.setState({spinner_visible:true});

        fetch("http://taohidulislam.pythonanywhere.com/my_all_messages/",{
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
                all_texts = responseJson.all_texts;
                this.setState({all_messages: all_texts,spinner_visible:false});
                if (all_texts.length==0){
                    this.setState({empty_text: "Your inbox in empty till now\n(Slide left to right to see options)"})
                }

            });
    }


    render()
    {
        return(
            <View>

                <ScrollView>
                    <Spinner visible={this.state.spinner_visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} cancelable={true} />

                    <View style={{ flexDirection: "row"}}>

                        <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10}}>
                            <Text onPress={()=>this.props.navigation.openDrawer()} style={{ fontWeight:"bold",fontSize:20,color:"rgb(8, 71, 98)",textShadowOffset:{width: -2, height: 2},}}>Menu </Text>
                        </View>

                        <View style={{ flex: 3 }}>
                            <Text style={{fontWeight:"bold",paddingTop:10,paddingLeft:45,paddingBottom:5,fontSize:30,color:"rgb(8, 71, 98)"}}>Inbox</Text>
                        </View>
                    </View>
                    <Text style={{textAlign:"center",paddingBottom:20,fontSize:20,color:"rgb(8, 71, 98)"}}>({this.state.sender})</Text>
                    {/*<Text style={{textAlign:"center",fontWeight:"bold",paddingTop:10,paddingBottom:5,fontSize:30,color:"rgb(8, 71, 98)"}}>>menuInbox</Text>*/}
                    {/*<Text style={{textAlign:"center",paddingBottom:20,fontSize:20,color:"rgb(8, 71, 98)"}}>({this.state.sender})</Text>*/}
                    <FlatList
                        data={this.state.all_messages}
                        renderItem={({item,index}) => <Text onPress = {()=>this.props.navigation.navigate("Message_details",{message:item[0],user_id:item[1]} )} style={{
                            paddingTop:10,paddingBottom:10,paddingLeft:10,
                            borderBottomColor:"white",borderBottomWidth:3,backgroundColor:"#F2F4F4"}} >{item[0]}</Text>}
                    />
                    <Text style={{fontSize:20,color:"Red",textAlign:"center"}}>{this.state.empty_text}</Text>
                </ScrollView>

            </View>
        )
    }
}