import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ImageCard = ({ image, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => onPress(image)}>
      <Image
        source={{ uri: image.url }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.textWrapper}>
        <Text style={styles.header} numberOfLines={1}>
          {image.title}
        </Text>
        <Text style={styles.timestamp}>{new Date(image.date).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textWrapper: {
    padding: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
});

export default ImageCard;
