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
//class escroute extends Component {
  constructor(props){
    super(props);
    this.state = {
      pic: {
        uri: 'https://vime.herokuapp.com/assets/images/grandiose-potatoe.gif'
      },
      username: '',
      password: '',
      itineraries: [],
      
      getRequest: () => {
        
        //fetch('https://http://esc-route.herokuapp.com/classes/itineraries', 
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
      },

      loginButton: function(){
        var data = {
          username: this.state.username,
          password: this.state.password
        };
        this.setState({password: ''});
        //fetch('https://esc-route.herokuapp.com/classes/login', {
        fetch('http://localhost:3000/classes/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify(data)
        }).then(function(){
          this.state.getRequest();       
        }.bind(this));
      }.bind(this)
    };
  }
  componentDidMount(){
    console.log('logging from sign in');
    //this.state.getRequest(); 
  }

  render() { 
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to ESC!{'\n'}
          Sign In here
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
          onPress={this.state.loginButton}>
          <View>
            <Text style={styles.buttonText}>Login</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  },

});

//AppRegistry.registerComponent('escroute', () => escroute);
