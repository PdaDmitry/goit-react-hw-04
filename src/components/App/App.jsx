import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';
// import css from './App.module.css';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const ACCESS_KEY = '6nKFTVbV1CJGv4nIC51WkGEbMVOjX878ZeUV0kluA-Y';

  const searchImages = async newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setLoading(false);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchData() {
      try {
        setError(false);
        setLoading(true);

        const response = await axios.get('https://api.unsplash.com/search/photos/', {
          params: {
            client_id: ACCESS_KEY,
            query,
            per_page: 12,
            orientation: 'landscape',
            page,
          },
        });
        setImages(prevImages => {
          return [...prevImages, ...response.data.results];
        });
        // console.log(response.data.results);
        // console.log(response);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={searchImages} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      <Toaster />
    </div>
  );
}
