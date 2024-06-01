import axios from 'axios';

export default async function fetchPhotos(query, page) {
  const ACCESS_KEY = '6nKFTVbV1CJGv4nIC51WkGEbMVOjX878ZeUV0kluA-Y';
  const per_page = 12;

  const response = await axios.get('https://api.unsplash.com/search/photos/', {
    params: {
      client_id: ACCESS_KEY,
      query,
      per_page,
      orientation: 'landscape',
      page,
    },
  });
  const results = response.data.results;
  const maxPages = Math.ceil(response.data.total / per_page);

  return { results, maxPages };
}
