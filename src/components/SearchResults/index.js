import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';

const SearchResults = ({ searchResults, setSelectedCity, fetchNearestAQI }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.resultsHeading}>Search Results:</Text>
      <ScrollView style={styles.scrollView}>
        {searchResults.map((result, index) => (
          <TouchableOpacity key={index} onPress={() => { setSelectedCity(result.n[0]); fetchNearestAQI(result.x); }}>
            <View style={styles.cityContainer}>
              <Text style={styles.city}>{result.n[0]},{result.n[1]}</Text>
              {index < searchResults.length - 1 && <View style={styles.separator} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchResults;
