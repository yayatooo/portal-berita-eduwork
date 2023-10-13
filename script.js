// menampung berita

let newsData = [];

// fetching data

async function getData() {
  try {
    const res = await fetch(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=056a291df8fe40a7830ff01ce598da95"
    );
    const data = await res.json();
    newsData = data.articles;
    displayNews(newsData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Declare API with foreach

function displayNews(newsData) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = ""; //

  newsData.forEach((value, i) => {
    const newsItem = document.createElement("div");
    newsItem.className =
      "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";

    const titleLink = document.createElement("a");
    titleLink.href = "#";
    const title = document.createElement("h5");
    title.className =
      "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
    title.textContent = value.title;
    titleLink.appendChild(title);

    const description = document.createElement("p");
    description.className = "mb-3 font-normal text-gray-700 dark:text-gray-400";
    description.textContent = value.description;

    const readMoreLink = document.createElement("a");
    readMoreLink.href = "#";
    readMoreLink.className =
      "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
    readMoreLink.textContent = "Read more";

    newsItem.appendChild(titleLink);
    newsItem.appendChild(description);
    newsItem.appendChild(readMoreLink);

    newsContainer.appendChild(newsItem);
  });
}

// LiveSearch Feature

function searchNews(query) {
  const filteredNews = newsData.filter((news) => {
    return news.title.toLowerCase().includes(query.toLowerCase());
  });
  displayNews(filteredNews);
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value;
  searchNews(searchTerm);
});

getData();
