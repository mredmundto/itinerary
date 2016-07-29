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
    };
  }

  componentDidMount(){
    console.log(this.props.currentItinerary);
    this.getRequest ();
  }

  render() { 
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>

        <Text style={styles.welcome}>
          {this.props.currentItinerary + 1} trip of {this.props.username}
        </Text>
      </ScrollView>
      </View>
    );
  }

  getRequest () {

    fetch('http://localhost:3000/classes/userItineraries', 
    {method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
     credentials: 'same-origin',        
     body: JSON.stringify({user: this.props.username})
    })
    .then(function(response) {
      return response.json(); 
    }).then((data) => {
      this.setState({itineraries: data});
      console.log('all itineraries', this.state.itineraries); 
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
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});