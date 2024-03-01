import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import SearchResults from '../../components/SearchResults';
import AQIInfo from '../../components/AQIData';
import moment from 'moment';
import styles from './styles'

const LandingScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log('searchResults--->',searchResults)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCityData, setSelectedCityData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        fetchAQIDataByLocation(latitude, longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchAQIDataByLocation = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=67ffea6955169a51ab80551f124d39991b64926c`);
      const { data } = response;
      setAqiData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching AQI data by location:', error);
      setError('Error fetching AQI data. Please try again.');
      setLoading(false);
    }
  };

  const searchCities = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(`https://search.waqi.info/nsearch/world/${query}`);
      const { results } = response.data;
      setSearchResults(results);
      setLoading(false);
    } catch (error) {
      console.error('Error searching cities:', error);
      setError('Error searching cities. Please try again.');
      setLoading(false);
    }
  };

  const fetchNearestAQI = async (xNumber) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(`https://mapq.waqi.info/mapq/nearest?from=${xNumber}`);
      const { data } = response;
      setSelectedCityData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching nearest AQI:', error);
      setError('Error fetching nearest AQI. Please try again.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>City Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter City Name"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchCities} />
      {loading && <Text>Loading...</Text>}
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {searchResults && searchResults?.length > 0 ?
        <SearchResults
          searchResults={searchResults}
          setSelectedCity={setSelectedCity}
          fetchNearestAQI={fetchNearestAQI}
        />
      : null}
      <AQIInfo
        selectedCity={selectedCity}
        selectedCityData={selectedCityData}
        aqiData={aqiData}
        latitude={latitude}
        longitude={longitude}
      />
    </View>
  );
};

export default LandingScreen;
