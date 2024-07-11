const API_KEY = `b0bd854324ca4848b08169ada4709bc1`;
let newsList = [];
let inputArea = document.getElementById("input-area");
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(` https://noona-times-be-5ca9402f90d9.herokuapp.com`);

const getNews = async () => {
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const getLatestNews = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  getNews();
};

const searchBox = () => {
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0px";
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  getNews();
};

const getnewsBykeyword = async () => {
  const keyword = document.getElementById("searchInput").value;
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();

  console.log("keyword", keyword);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) =>
        ` <div class="row news">
          <div class="col-lg-4">
            <img class="news-img-size" src="${news.urlToImage}"
              onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'">
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${
                news.description == null || news.description == ""
                  ? "내용없음"
                  : news.description.length > 200
                  ? news.description.substring(0, 200) + "..."
                  : news.description
              }
            </p>
            <div>${news.source.name || "no source"} ${moment(news.publishedAt)
          .startOf("day")
          .fromNow()} </div>
          </div>
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
