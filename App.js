import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, PermissionsAndroid} from 'react-native';
import RNSimpleNativeGeofencing from "react-native-simple-native-geofencing";


async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location permission',
          'message': 'Needed obviously'
        }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Granted Permission")
    } else {
      console.log("Denied Permission")
    }
  } catch (err) {
    console.warn(err)
  }
}


type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
  }
  componentWillMount() {
    requestLocationPermission();
  }
  componentDidMount() {
    RNSimpleNativeGeofencing.initNotification(
        {
          channel: {
            title: "SenSaftey",
            description: "Area Notifications"
          },
          start: {
            notify: true,
            title: "Start Tracking",
            description: "You are now tracked"
          },
          stop: {
            notify: true,
            title: "Stopped Tracking",
            description: "You are not tracked any longer"
          },
          enter: {
            notify: true,
            title: "Attention",
            description: "You entered a [value] Zone"
          },
          exit: {
            notify: true,
            title: "Left Zone",
            description: "You left a [value] Zone"
          }
        }
    );
  }

  stopMonitoring(){
    RNSimpleNativeGeofencing.removeAllGeofences();
  }
  createGeofences(){
    let geofences = [
      {
        key: "geoNum1",
        latitude: 38.9204,
        longitude: -77.0175,
        radius: 200,
        value: "yellow"
      },
      {
        key: "geoNum2",
        latitude: 38.9248,
        longitude: -77.0258,
        radius: 200,
        value: "green"
      },
      {
        key: "geoNum3",
        latitude: 47.423,
        longitude: -122.084,
        radius: 200,
        value: "red"
      },
      {
        key: "geoNum4",
        latitude: 38.9241,
        longitude: -77.0234,
        radius: 200,
        value: "yellow"
      },
      {
        key: "home",
        latitude: 52.544752,
        longitude: 13.357720,
        radius: 200,
        value: "green"
      },
      {
        key: "TU Berlin",
        latitude: 52.5124719,
        longitude: 13.320846,
        radius: 500,
        value: "red"
      },
      {
        key: "monitor",
        latitude: 52.516894,
        longitude: 13.324367,
        radius: 100,
      },
    ];

    RNSimpleNativeGeofencing.addGeofences(geofences, 300000);
  }

  componentWillUnmount() {
    //RNSimpleNativeGeofencing.removeAllGeofences();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button title={"Create Geofences"} onPress={this.createGeofences} />
        <Button title={"Stop"} onPress={this.stopMonitoring} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
