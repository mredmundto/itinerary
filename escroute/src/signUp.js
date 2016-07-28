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

export default class signIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      pic: {
        uri: 'https://vime.herokuapp.com/assets/images/grandiose-potatoe.gif'
      },
      username: '',
      password: '',
      itineraries: []
    };
  }

  componentDidMount(){ 

  }

  render() { 
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
 
          This is sign up!
          <Image source={this.state.pic} style={{width: 30, height: 30}}/>        
        </Text>

        <TextInput
          style={{height: 40}}
          placeholder="Please enter the user name here"
          value = {this.state.username}
          onChangeText={(username) => this.setState({username})}
        />

        <TextInput
        secureTextEntry = {true}
          style={{height: 40}}
          placeholder="Please enter the password here"
          value = {this.state.password}
          onChangeText={(password) => this.setState({password})}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.loginButton.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={this.state.loginButton}>
          <View>
            <Text style={styles.buttonText}>Sign Up here!</Text>
          </View>
        </TouchableHighlight>

        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.username}
        </Text>

        <Text style={styles.instructions}>
          Login to show all itineraries
        </Text>

        {this.state.itineraries.map(function(itinerary, index){
          return <Text key={index} style={styles.welcome}> {itinerary.location} by {itinerary.User.name}</Text>;  
        }
        
        )}

        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </ScrollView>
      </View>
    );
  }

  // refactoring the AJAX call here
  loginButton () {
    var data = {
      username: this.state.username,
      password: this.state.password
    };
    this.setState({password: ''});
    fetch('http://localhost:3000/classes/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then(function(){
      this.getRequest();       
    }.bind(this));
  }

  // get reuqest
  getRequest () {
    fetch('http://localhost:3000/classes/itineraries', 
    {method: 'GET'})
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