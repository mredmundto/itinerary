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
      errorMessage: '', 
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
 
          SIGN UP HERE!
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

        <TextInput
        secureTextEntry = {true}
          style={{height: 40}}
          placeholder="Please re-enter the password here"
          value = {this.state.confirmPassword}
          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={this.signUp.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={this.backToSignIn.bind(this)}>
          <View>
            <Text style={styles.buttonText}>back to sign in!</Text>
          </View>
        </TouchableHighlight>

        <Text style={{padding: 10, fontSize: 20, color: 'red',}}>
          {this.state.errorMessage}
        </Text>

      </ScrollView>
      </View>
    );
  }

  backToSignIn () {
    this.props.navigator.pop();
  }
  // refactoring the AJAX call here

  goToViewAll (){
   this.props.navigator.push({name: 'viewAll'}); 
  }

  signUp () {

    if (this.state.password === this.state.confirmPassword ){
      var data = {
        username: this.state.username,
        password: this.state.password
      };
      this.setState({password: ''});
      this.setState({confirmPassword: ''});
      fetch('http://localhost:3000/classes/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      })
      .then(function(){
        console.log('user created!');   
        this.goToViewAll();     
      }.bind(this));
    }else{
      this.setState({errorMessage: 'Passwords do not match'});
    }
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