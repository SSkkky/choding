import axios from 'axios';

export async function googleSearch(query: string) {
  {/*
https://www.googleapis.com/customsearch/v1/?q=농담곰 &key=AIzaSyDwHVtDPnQ0gAvMQnXSwdHiyt-LIlmUiRA&cx=c3bfeca1422984473&num=4&fields=items(title,link,displayLink,snippet,pagemap/cse_thumbnail,pagemap/metatags/twitter:description)
*/}

  // console.log('검색어는 = ', query)
  const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
    params: {
      key: process.env.GOOGLE_API_KEY,
      cx: process.env.CUSTOM_SEARCH_ENGINE_ID,
      q: query,
      fields: 'items(title,link,displayLink,snippet,pagemap/cse_thumbnail,pagemap/metatags/twitter:description)',
      num: 6
    },
  });

  return response.data;
}