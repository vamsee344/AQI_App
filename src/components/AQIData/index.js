import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

const AQIInfo = ({ selectedCity, selectedCityData, aqiData, latitude, longitude }) => {

  return (
    <View style={styles.aqiContainer}>
    {selectedCity && selectedCityData && (
        <View style={styles.aqiContainer}>
          <Text style={styles.aqiHeading}>AQI for {selectedCity}:</Text>
          <Text>AQI: {selectedCityData.d[0].v}</Text>
          <Text>Last Updated: {new Date(selectedCityData.d[0].t * 1000).toLocaleString()}</Text>
        </View>
      )}
      {aqiData && !selectedCity && (
        <View style={styles.aqiContainer}>
          <Text style={styles.aqiHeading}>AQI for Your Location:</Text>
          <Text>AQI: {aqiData.data.aqi}</Text>
          <Text>Last Updated: {aqiData.data.time.s}</Text>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
          <Text>City Name: {aqiData.data.city?.name}</Text>
          <Text>Weather Station: {aqiData.data.city?.station?.name}</Text>
        </View>
      )}
    </View>
  );
};



export default AQIInfo;
