import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loading from "./Loading";
import { Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Weather from './Weather';

const API_KEY = "6c548ef5d7927d0934a45d3dfc76bdeb";
const URL = "http://api.openweathermap.org/data/2.5/weather";

export default class extends React.Component {
  state = {
    isLoading: true
  }
  getWeather = async (latitude, longitude) => {
    const { 
      data: { 
        main: {temp},
        weather
      } 
    } = await axios.get(`${URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

    this.setState({ 
      isLoading: false, 
      temp,
      condition: weather[0].main
    })
  };
  
  getLocation = async() => {  
    try {
      await Location.requestForegroundPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude)
    } catch (error) {
      Alert.alert("Can't find your location", "so sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  };
  render() {
    const { isLoading, temp, condition } = this.state;

    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition = {condition} />;
  }
}