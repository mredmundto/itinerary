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
import viewOne from './src/viewOne';

var routes = {
  signIn: signIn, 
  signUp: signUp,
  viewAll: viewAll, 
  create: create,
  viewOne: viewOne 
}; 

class escroute extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      setName: (name) => {
        this.setState({username: name}); 
      },
      currentItinerary: null, 
      setCurrentItinerary: (currentItinerary) => {
        this.setState({currentItinerary: currentItinerary}); 
      },
    };
  }

  renderScene(route, navigator) {
    var Component = routes[route.name];

    return <Component 
    route={route} 
    navigator={navigator} 
    username={this.state.username}
    setName={this.state.setName}
    currentItinerary={this.state.currentItinerary}
    setCurrentItinerary={this.state.setCurrentItinerary}
    />;
  }

  render (){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signIn'}}
        renderScene={this.renderScene.bind(this)}
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