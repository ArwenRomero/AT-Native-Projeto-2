import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const ImageDetailScreen = ({ route }) => {
  const { image } = route.params;
  const { width } = Dimensions.get('window');

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: image.hdurl || image.url }}
        style={[styles.image, { width, height: width * 0.75 }]}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title}>{image.title}</Text>
        <Text style={styles.date}>Date: {new Date(image.date).toLocaleString()}</Text>
        <Text style={styles.explanation}>{image.explanation}</Text>
        {image.copyright && (
          <Text style={styles.copyright}>© {image.copyright}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4fc',
  },
  image: {
    borderBottomWidth: 5,
    borderBottomColor: '#003366',
  },
  details: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#336699',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  copyright: {
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
  },
});

export default ImageDetailScreen;
