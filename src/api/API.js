import axios from 'axios';

const API_URL = 'https://images-api.nasa.gov/search';

export const fetchNasaImages = async (currentPage = 1, searchQuery = 'earth') => {
  try {
    const { data } = await axios.get(API_URL, {
      params: {
        q: searchQuery,
        media_type: 'image',
        page: currentPage,
        page_size: 10,
      },
    });

    const transformedImages = data.collection.items
      .filter(item => item.links && item.links[0]?.href)
      .map(item => ({
        title: item.data[0].title,
        date: item.data[0].date_created,
        url: item.links[0]?.href,
        hdurl: item.links[0]?.href,
        explanation: item.data[0].description,
        copyright: item.data[0].photographer || 'NASA',
        nasa_id: item.data[0].nasa_id,
      }));

    return {
      images: transformedImages,
      totalPages: Math.ceil(data.collection.metadata.total_hits / 10),
    };
  } catch (err) {
    console.error('Error fetching NASA images:', err);
    throw err;
  }
};
