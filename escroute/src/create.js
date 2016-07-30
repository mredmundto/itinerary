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

export default class create extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Account created. {'\n'}
          This is beta. Please go to our website to create new itineray{'\n'}
          https://esccc.herokuapp.com/
        </Text>

        <TouchableHighlight
          style={styles.button}
          onPress={this.backToSignIn.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Back to sign In</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  backToSignIn () {
    this.props.navigator.push({name: 'signIn'}); 
  }
}



const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: 'white',
   margin: 10,
 },
 welcome: {
   fontSize: 15,
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