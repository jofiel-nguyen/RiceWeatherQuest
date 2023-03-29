
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
  // Sort the search history array alphabetically
  searchHistory.sort();

  // Clear the history list
  historyList.innerHTML = '';

  // Iterate through the sorted search history array
  searchHistory.forEach((term) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = term;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      getWeatherData(term)
        .then((data) => {
          displayWeatherInfo(data);
        })
        .catch((error) => {
          console.error(error);
          weatherInfo.innerHTML = `Error: ${error.message}`;
        });
    });
    li.appendChild(link);
    historyList.appendChild(li);
  });
}
