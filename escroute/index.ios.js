// Index page for route

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

import signIn from './src/signIn';
import signUp from './src/signUp';
import viewAll from './src/viewAll';
import create from './src/create';

var routes = {
  signIn: signIn, 
  signUp: signUp,
  viewAll: viewAll, 
  create: create
}; 

class escroute extends Component {

  renderScene(route, navigator) {
    var Component = routes[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render (){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signUp'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 10,
  }
});

AppRegistry.registerComponent('escroute', () => escroute);