import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';
import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchImages = async query => {
    const ACCESS_KEY = '6nKFTVbV1CJGv4nIC51WkGEbMVOjX878ZeUV0kluA-Y';

    try {
      setError(false);
      setLoading(true);
      // setImages([]);
      const response = await axios.get('https://api.unsplash.com/search/photos/', {
        params: {
          client_id: ACCESS_KEY,
          query,
          per_page: 10,
          orientation: 'landscape',
          page: 2,
        },
      });
      setImages(response.data.results);

      console.log(response.data.results);
      console.log(response);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={searchImages} />
      {loading && <Loader />}
      {error && (
        <p className={css.errorText}>
          Whoops, something went wrong! Please try reloading this page! 🤔
        </p>
      )}
      {images.length > 0 && <ImageGallery items={images} />}
      <button>Load more</button>
      <Toaster />
    </div>
  );
}
