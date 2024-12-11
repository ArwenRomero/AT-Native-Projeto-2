import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, style }) => {
  return (
    <View style={[styles.track, style]}>
      <View style={[styles.fill, { width: `${Math.min(progress, 100)}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 10,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
});

export default ProgressBar;
