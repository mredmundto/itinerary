import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView, 
  TextInput,
  TouchableHighlight
} from 'react-native';


export default class viewOne extends Component{
  constructor(props){
    super(props);
    this.state = {
      pic: {
        uri: 'https://s3.amazonaws.com/greenfield-hr44/Screen+Shot+2016-07-28+at+10.09.51+PM.png'
      },
      yelp: []
    };
  }

  componentDidMount(){
    this.getRequest ();
  }

  render() { 
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>



        <TouchableHighlight
          style={styles.button}
          onPress={this.back.bind(this)}>
          <Text style={styles.welcome}>
           Back to all trip
           <Image source={this.state.pic} style={{width: 30, height: 30}}/> 
          </Text>
        </TouchableHighlight>

        {this.state.yelp.map(function(event, index){
          return (
            <View key = {index} style={styles.item}>
              <Text style={styles.text}>Name: {event.name} {'\n'}Address: {event.address} {'\n'}{event.snippet}{'\n'}  </Text>      
              <Image source={ {uri: event.image}} style={styles.image}/>   
            </View>
          )}.bind(this)
        )}

      </ScrollView>
      </View>
    );
  }

  back () {
    this.props.navigator.pop();
  } 

  getRequest () {
    fetch('https://esccc.herokuapp.com/classes/itineraryEvents', 
    {method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
     credentials: 'same-origin',        
     body: JSON.stringify({id: this.props.currentItinerary})
    })
    .then(function(response) {

      return response.json(); 
    }).then((data) => {
      console.log('yelp data', data);
      this.setState({yelp: data}); 
    })
    .catch(function(err) {
      console.log('err', err);
    });

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10

  },
  welcome: {
    fontSize: 25,
    fontFamily: 'Kohinoor Bangla',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    fontSize: 15,
    marginLeft: 10
  },
  text: {
    fontSize: 12,
    marginTop: 12,
    marginLeft: 5
  },
  item: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4db6ac',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  image: {
    justifyContent: "center",    //  <-- you can use "center", "flex-start",
    width: 120, 
    height: 120, 
    marginBottom: 10
  } 
});