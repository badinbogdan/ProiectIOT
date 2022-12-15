import { StyleSheet, View, ActivityIndicator,Text } from 'react-native';
import React, { } from 'react';
import MapView, { Marker } from 'react-native-maps';

var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

const limLeftLong = 23.5360;
const limRightLong = 23.7032;
const limUpLat = 46.8070;
const limDownLat = 46.7384;

export default class App extends React.Component {
  //the react constructor for intializing the states of the variables used with the useState hook from react
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,        //a flag used for rendering the data only after the fetching is done 
      dataSource: [],         //an empty array which will be used to store the API response
    }
  }

  componentDidMount() {
    // Mount the data for the first time using a timeout of 6 seconds
    setTimeout(()=>{this.fetchData();},600);
  }
  componentDidUpdate() {
    // Call the fetchData function every 15 seconds
    setTimeout(()=>{this.fetchData();},15000);
  }
  
  fetchData() {
    //fetching the data from the thingspeak API, creating the JSON response and storing it in dataSource
    return fetch("https://api.thingspeak.com/channels/1939145/feeds.json?api_key=UV4QYE7WQ0WIEUBV&results=1")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.feeds,
        })
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log();
        console.log('This is the data from the api:');
        console.log(this.state.dataSource);
        console.log();
      });
  }
  
  calDelta(lat, long, accuracy) {
    //calculating the delta latitude and delta logitude, based on the latitude and logitude data from the api 
    const oneDegreeOfLatitudeInMeters = 111.32 * 10;
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));
    //returning the object used as the region which will be rendered in the UI 
    return {
      latitude: Number(lat),
      longitude: Number(long),
      //the result from the above calculations is with 10 decimals, so we round the number to the first 4 decimals
      latitudeDelta: Math.round(latDelta * 10000) / 10000,
      longitudeDelta: Math.round(longDelta * 10000) / 10000
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      //mapping the data that we stored in dataSource so that we can use the actual value stored inside it
      let data = this.state.dataSource.map((val, key) => {
        //creating the mapRegion object by calling the method calDelta
        let mapRegion = this.calDelta(val.field4, val.field3, val.field7)
        console.log("The latitude is: " + mapRegion.latitude, "and the longitude is: " + mapRegion.longitude + ".")
        if (mapRegion.latitude < limDownLat || mapRegion.latitude > limUpLat || 
          mapRegion.longitude < limLeftLong || mapRegion.longitude > limRightLong ){
        return <View key={key} style={styles.container}>
          <View style={styles.item}>
            <View style={styles.rectangle}>
            <Text style={{color: '#523735' , fontWeight:'bold'}}>Your latitude is {mapRegion.latitude}
             and your longitude is {mapRegion.longitude}.</Text>
            <Text style={{color: '#523735' , fontWeight:'bold'}}>You are outside of Cluj-Napoca!</Text>
            </View>
              <MapView style={styles.map} region={mapRegion} customMapStyle={mapStyle}>
                <Marker coordinate={mapRegion} title={"Your altitude is " + val.field6 + " meters"}></Marker>
              </MapView>
          </View>
        </View>} else {
          return <View key={key} style={styles.container}>
          <View style={styles.item}>
            <View style={styles.rectangle}>
            <Text style={{color: '#523735' , fontWeight:'bold'}}>Your latitude is {mapRegion.latitude}
             and your longitude is {mapRegion.longitude}.</Text>
            </View>
              <MapView style={styles.map} region={mapRegion} customMapStyle={mapStyle}>
                <Marker coordinate={mapRegion} title={"Your altitude is " + val.field6 + " meters"}></Marker>
              </MapView>
          </View>
        </View>
        }});
      return (
        <View style={styles.container}>
          {data}
        </View>
      );
    }
  }
}

//styling for the container, item, map and rectangle in CSS 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  item: {
    flex: 2,
    alignSelf: 'stretch',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
    borderBottomColor: 'green',
  },
  map: {
    marginTop: 0,
    width: '120%',
    height: '80%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  rectangle:{
    flex: 1,
    backgroundColor:'#b9d3c2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    width: '118%',
    borderStyle: 'solid',
    borderTopWidth:1,
    borderTopColor:'#ffffff',
    borderBottomWidth:1.5,
    borderBottomColor:'#7f6a66',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});