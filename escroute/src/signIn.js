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
      confirmPassword: '', 
      itineraries: [],
      errorMesaage: ''
    };
  }

  componentDidMount(){ 

  }

  render() { 
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          welcome to esc!
          <Image source={this.state.pic} style={{width: 30, height: 30}}/>        
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Please enter the user name here"
          value = {this.state.username}
          onChangeText={(username) => this.setState({username})}
        />

        <TextInput
        secureTextEntry = {true}
          style={styles.input}
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
          onPress={this.goToSignUp.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Sign Up </Text>
          </View>
        </TouchableHighlight>

        <Text style={{padding: 10, fontSize: 20}}>
          {this.state.errorMesaage}
        </Text>

      </ScrollView>
      </View>
    );
  }

  goToSignUp () {
    this.props.navigator.push({name: 'signUp'});
  }

  goToViewAll (){
   // setting parent class 
   this.props.setName(this.state.username);
   this.props.navigator.push({name: 'viewAll'}); 
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
      // go to viewALl
      this.goToViewAll();        
    }.bind(this));
  }

  // get reuqest
  getRequest () {

    fetch('http://localhost:3000/classes/userItineraries', 
    {method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
     credentials: 'same-origin',        
     body: JSON.stringify({user: this.state.username})
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
    fontSize: 35,
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  input: {
    height: 40,
    fontSize: 15,
    margin: 10
  },
  buttonText: {
    fontSize: 15,
    padding:15, 
    height:45, 
    overflow:'hidden', 
    borderRadius:5, 
    backgroundColor: '#4db6ac',
    margin: 10
  }
});