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
        uri: 'https://s3.amazonaws.com/greenfield-hr44/Screen+Shot+2016-07-28+at+10.09.51+PM.png'
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
          esc
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
            <Text style={styles.buttonText}>Sign up </Text>
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
    
    fetch('https://esccc.herokuapp.com/classes/login', {
    //fetch('http://localhost:3000/classes/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then(function(){
      this.goToViewAll();        
    }.bind(this));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  welcome: {
    fontSize: 30,
    fontFamily: 'Kohinoor Bangla',
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
    fontWeight: 'bold', 
    padding:15, 
    height:45, 
    overflow:'hidden', 
    borderRadius:5, 
    backgroundColor: '#4db6ac',
    margin: 10
  }
});