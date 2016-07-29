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


export default class viewOne extends Component{
  constructor(props){
    super(props);
    this.state = {
      yelp: []
    };
  }

  componentDidMount(){
    console.log(this.props.currentItinerary);
    this.getRequest ();
  }

  render() { 
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>



        <TouchableHighlight
          style={styles.button}
          onPress={this.back.bind(this)}>
          <Text style={styles.welcome}>
           Back to all trip
          </Text>
        </TouchableHighlight>

        {this.state.yelp.map(function(event, index){
          return (
            <View key = {index}>
              <Image source={ {uri: event.image}} style={{width: 80, height: 80}}/>        
              <Text style={styles.buttonText}>Name: {event.name} {'\n'}Address: {event.address} {'\n'}{event.snippet}{'\n'}  </Text>      
            </View>
          )}.bind(this)
        )}

      </ScrollView>
      </View>
    );
  }

  back () {
    this.props.navigator.pop();
  } 

  getRequest () {

    fetch('http://localhost:3000/classes/itineraryEvents', 
    {method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
     credentials: 'same-origin',        
     body: JSON.stringify({id: this.props.currentItinerary})
    })
    .then(function(response) {

      return response.json(); 
    }).then((data) => {
      console.log('yelp data', data);
      this.setState({yelp: data}); 
    })
    .catch(function(err) {
      console.log('err', err);
    });

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 10
  }
});