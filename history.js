
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
    const link = document.createElement('a');
    link.href = '#'; // Set the href to "#" so it doesn't navigate to a new page
    link.textContent = term;
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the link from navigating to a new page
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
