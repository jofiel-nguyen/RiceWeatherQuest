
const historyList = document.getElementById('search-history');

let searchHistory = [];

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form from submitting

  const location = locationInput.value;

  // call function to fetch weather data from API
  getWeatherData(location)
    .then((data) => {
      // display weather information in the weatherInfo div
      displayWeatherInfo(data);

      // add search term to history array if it doesn't already exist
      if (!searchHistory.includes(location)) {
        searchHistory.push(location);
        displayHistory();
      }
    })
    .catch((error) => {
      console.error(error);
      // display error message in the weatherInfo div
      weatherInfo.innerHTML = `Error: ${error.message}`;
    });
});

function displayHistory() {
  historyList.innerHTML = '';
  searchHistory.forEach((term) => {
    const li = document.createElement('li');
    li.textContent = term;
    historyList.appendChild(li);
  });
}
