import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, Modal, TouchableHighlight, View, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      array:[]
    }
  }

  componentDidMount() {
    return fetch("https://api.thingspeak.com/channels/1939145/feeds.json?api_key=UV4QYE7WQ0WIEUBV&results=2")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.feeds,
          //array: array.push(this.state.dataSource)
        })
      })
      .catch((error)=>{
        console.log(error);
      })
      .finally(()=>{
        console.log(this.state.dataSource);
        //console.log(array)
      })  
  }
  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let movies=this.state.dataSource.map((val,key)=>{
        return <View key={key} /*style={styles.item}*/>
          <Text>{val.field1}</Text>
          <Text>{key}</Text>
        </View>
      });
      return (
        <View /*style={styles.container}*/>
            {movies}
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    flex: 1,
    alignSelf:'stretch',
    margin:10,
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderBottomColor:'green'
  }
});
