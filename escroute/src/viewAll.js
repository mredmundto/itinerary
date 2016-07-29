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


export default class viewAll extends Component{
  constructor(props){
    super(props);
    this.state = {
      pic: {
        uri: 'https://vime.herokuapp.com/assets/images/grandiose-potatoe.gif'
      },
      itineraries: []
    };
  }

  componentDidMount(){
    this.getRequest ();
  }

  render() { 
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>

        <Text style={styles.welcome}>
          Itineraries of {this.props.username}
        </Text>
        {this.state.itineraries.map(function(itinerary, index){
          return (
            <TouchableHighlight key = {index} onPress={ () => this.gotoViewOne(itinerary.id)}>
            <Text key={index} style={styles.buttonText}> {itinerary.numDays} days trip to {itinerary.location} </Text>
            </TouchableHighlight>
          )}.bind(this)
        )}
      </ScrollView>
      </View>
    );
  }

  gotoViewOne(index){
    console.log(this)
    this.props.setCurrentItinerary(index); 
    this.props.navigator.push({name: 'viewOne'});
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
     body: JSON.stringify({user: this.props.username})
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