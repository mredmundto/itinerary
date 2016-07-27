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
      getRequest: function(){
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(function(response) {
          return response.json(); 
        }).then(function(data){
          console.log(data); 
        })
        .catch(function(err) {
          console.log('err', err);
        });
      }

    };
  }
  componentDidMount(){
    console.log('componentDidMount here');
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
