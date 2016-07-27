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
  TextInput,
  TouchableHighlight
} from 'react-native';

class escroute extends Component {
  constructor(props){
    super(props);
    this.state = {
      pic: {
        uri: 'https://vime.herokuapp.com/assets/images/grandiose-potatoe.gif'
      },
      username: '',
      password: '',
      itineraries: [],
      getRequest: function(){
        fetch('http://localhost:3000/classes/itineraries', 
        {method: 'GET'})
        .then(function(response) {
          return response.json(); 
        }).then(function(data){
          this.setState({itineraries: data});
          console.log('itineraries', this.state.itineraries); 
        }.bind(this))
        .catch(function(err) {
          console.log('err', err);
        });
      }.bind(this),
      loginButton: function(){
        // console.log('username', this.state.username);
        // console.log('password', this.state.password);
        
        var data = {
          username: this.state.username,
          password: this.state.password
        };
        fetch('http://localhost:3000/classes/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify(data)
        })

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
          placeholder="Please enter the user name here"
          onChangeText={(username) => this.setState({username})}
        />

        <TextInput
          style={{height: 40}}
          placeholder="Please enter the password here"
          onChangeText={(password) => this.setState({password})}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.state.loginButton}>
          <View>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableHighlight>

        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.username}
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
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('escroute', () => escroute);
