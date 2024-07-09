const API_KEY = `b0bd854324ca4848b08169ada4709bc1`;
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  let news = data.articles;
  console.log("rrr", news);
};
getLatestNews();
