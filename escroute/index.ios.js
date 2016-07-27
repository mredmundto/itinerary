/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView, 
  TextInput
} from 'react-native';

class escroute extends Component {
  constructor(props){
    super(props);
    this.state = {
      pic: {
        uri: 'https://vime.herokuapp.com/assets/images/grandiose-potatoe.gif'
      },
      text: '',
      itineraries: [],
      getRequest: function(){
      fetch('http://localhost:3000/classes/itineraries', {
        method: 'GET'
      })
      .then(function(response) {
        return response.json(); 
      }).then(function(data){
        this.setState({itineraries: data});
        console.log('itineraries', this.state.itineraries); 
      }.bind(this))
      .catch(function(err) {
        console.log('err', err);
      });
    }.bind(this)
    };
  }
  componentDidMount(){
    this.state.getRequest(); 
  }

  render() { 
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to ESC!
        </Text>

        <TextInput
          style={{height: 40}}
          placeholder="Enter the city!"
          onChangeText={(text) => this.setState({text})}
        />

        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text}
        </Text>

        <Image source={this.state.pic} style={{width: 200, height: 200}}/>


        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>

        {this.state.itineraries.map(itinerary => <Text style={styles.welcome}> {itinerary.location} </Text>
        )}

        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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

AppRegistry.registerComponent('escroute', () => escroute);
