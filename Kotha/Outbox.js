import React,{Component} from "react";
import {View,Text,TextInput,StyleSheet,Picker,ScrollView,FlatList,Alert,AsyncStorage} from "react-native";
import {Button} from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob';
export default class Outbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            all_messages: [],
            sender:"",
        };
        sender="";
        this.get_all_messages = this.get_all_messages.bind(this);
        this._retrieveData = this._retrieveData.bind(this);

    }
    componentWillMount()
    {
        AdMobInterstitial.setAdUnitID('ca-app-pub-2782059942193503/5416535290');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
    componentDidMount()
    {
        this._retrieveData();
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                this.sender =value;
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

        fetch("http://taohidulislam.pythonanywhere.com/sent_messages/",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                username :this.sender,

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


                    <View style={{ flexDirection: "row"}}>

                        <View style={{ flex: 1, paddingTop: 15, paddingLeft: 10}}>
                            <Text onPress={()=>this.props.navigation.openDrawer()} style={{ fontWeight:"bold",fontSize:20,color:"rgb(8, 71, 98)",textShadowOffset:{width: -2, height: 2},}}>Menu </Text>
                        </View>

                        <View style={{ flex: 3 }}>
                            <Text style={{fontWeight:"bold",paddingTop:10,paddingLeft:35,paddingBottom:5,fontSize:30,color:"rgb(8, 71, 98)"}}>Outbox</Text>
                        </View>
                    </View>
                    <Text style={{textAlign:"center",paddingBottom:20,fontSize:20,color:"rgb(8, 71, 98)"}}>({this.state.sender})</Text>

                    {/*<Text style={{textAlign:"center",fontWeight:"bold",paddingTop:10,paddingBottom:5,fontSize:30,color:"rgb(8, 71, 98)"}}>Outbox</Text>*/}
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-2782059942193503/5400331229"
                        testDevices={[AdMobBanner.simulatorId]}

                    />
                    <FlatList
                        data={this.state.all_messages}
                        renderItem={({item,index}) => <Text  style={{
                            paddingTop:10,paddingBottom:10,paddingLeft:10,
                            borderBottomColor:"white",borderBottomWidth:3,backgroundColor:"#F2F4F4"}} >{item[0]}</Text>}
                    />
                </ScrollView>

            </View>
        )
    }
}