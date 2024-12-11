import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { fetchNasaImages } from '../api/API';
import ImageCard from '../components/cardImagem';
import ProgressBar from '../components/barraProgresso';
import CelestialBodySearch from '../components/Planetas';

const GalleryScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('earth');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const allImagesLoadedRef = useRef(false);
  const { width } = Dimensions.get('window');

  const fetchImages = async (query, refresh = false) => {
    try {
      setError(null);
      refresh ? setRefreshing(true) : setIsLoadingMore(true);

      const { images: newImages, totalPages } = await fetchNasaImages(refresh ? 1 : page, query);

      allImagesLoadedRef.current = page >= totalPages;

      setImages(refresh ? newImages : [...images, ...newImages]);
      setTotalPages(totalPages);
      setPage(refresh ? 1 : page + 1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchImages(currentQuery);
  }, [currentQuery]);

  const onRefresh = useCallback(() => {
    fetchImages(currentQuery, true);
  }, [currentQuery]);

  const loadMoreImages = () => {
    if (!isLoadingMore && !allImagesLoadedRef.current && page <= totalPages) {
      fetchImages(currentQuery);
    }
  };

  const searchImages = (query) => {
    setCurrentQuery(query);
    setImages([]);
    setPage(1);
    allImagesLoadedRef.current = false;
  };

  const openImageDetail = (image) => {
    navigation.navigate('ImageDetail', { image });
  };

  const renderFooter = () => {
    if (allImagesLoadedRef.current) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>No more images to load</Text>
        </View>
      );
    }

    if (isLoadingMore) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      );
    }

    return null;
  };

  const progress = (page / totalPages) * 100;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading images: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CelestialBodySearch onSearch={searchImages} />
      <ProgressBar progress={progress} style={styles.progressBar} />
      <Text style={styles.title}>Images of {currentQuery.toUpperCase()}</Text>
      <FlatList
        data={images}
        keyExtractor={(item, index) => `${index}-${item.nasa_id}`}
        renderItem={({ item }) => (
          <ImageCard
            image={item}
            onPress={openImageDetail}
            style={styles.imageCard}
          />
        )}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreImages}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1e90ff']}
            tintColor="#1e90ff"
          />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={21}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4fc',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#b00',
    fontSize: 16,
  },
  loader: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#d0d0d0',
  },
  footer: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#003366',
  },
  imageCard: {
    marginBottom: 10,
  },
});

export default GalleryScreen;
