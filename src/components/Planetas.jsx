import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';

const CELESTIAL_BODIES = [
  'earth', 'moon', 'sun', 'mars', 'jupiter', 'saturn', 'venus', 'mercury',
  'neptune', 'uranus', 'solar system', 'galaxy', 'nebula',
];

const CelestialBodySearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('earth');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = query => {
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(false);
  };

  const renderSuggestionButtons = () => {
    return CELESTIAL_BODIES.filter(body =>
      body.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(body => (
      <TouchableOpacity
        key={body}
        style={styles.suggestion}
        onPress={() => handleSearch(body)}
      >
        <Text style={styles.suggestionText}>{body}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSearch(searchQuery)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {showSuggestions && (
        <ScrollView horizontal style={styles.suggestions} showsHorizontalScrollIndicator={false}>
          {renderSuggestionButtons()}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#eaf4ff',
    padding: 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#a4c1ff',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#4298f5',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  suggestions: {
    marginTop: 12,
  },
  suggestion: {
    backgroundColor: '#d0e5ff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
  suggestionText: {
    color: '#333333',
  },
});

export default CelestialBodySearch;
