const form = document.querySelector('form');
const locationInput = document.querySelector('#location-input');
const weatherInfo = document.querySelector('#weather-info');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form from submitting

  const location = locationInput.value;

  // call function to fetch weather data from API
  getWeatherData(location)
    .then((data) => {
      // display weather information in the weatherInfo div
      displayWeatherInfo(data);
    })
    .catch((error) => {
      console.error(error);
      // display error message in the weatherInfo div
      weatherInfo.innerHTML = `Error: ${error.message}`;
    });
});

async function getWeatherData(location) {
  const apikey = 'ea081e7c8189b40b973d3d4c71f263d0';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to fetch weather data');
  }

  const data = await response.json();

  return data;
}

function displayWeatherInfo(data) {
  const { name, main: { temp, humidity }, weather: [ { description } ] } = data;

  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${temp}°F</p>
    <p>Humidity: ${humidity}%</p>
    <p>Description: ${description}</p>
  `;
}
