import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';

export default function App() {
  const [images, setImages] = useState([]);

  const searchImages = async query => {
    const ACCESS_KEY = '6nKFTVbV1CJGv4nIC51WkGEbMVOjX878ZeUV0kluA-Y';

    try {
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
      console.log(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={searchImages} />
      {images.length > 0 && (
        <ul>
          {images.map(image => (
            <li key={image.id}>
              <div>
                <img src={image.urls.small} alt="" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
