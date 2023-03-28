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
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apikey}`;

  const [weatherResponse, forecastResponse] = await Promise.all([
    fetch(weatherUrl),
    fetch(forecastUrl)
  ]);

  if (!weatherResponse.ok || !forecastResponse.ok) {
    throw new Error('Unable to fetch weather data');
  }

  const weatherData = await weatherResponse.json();
  const forecastData = await forecastResponse.json();

  return { weatherData, forecastData };
}
function displayWeatherInfo(data) {
  const { weatherData, forecastData } = data;
  const { name, main: { temp, humidity }, weather: [ { description, icon } ] } = weatherData;
  
  // Get the forecast data for the current day and every fifth day
  const forecastList = forecastData.list.filter((forecast, index) => index % 8 === 0);

  const weatherIconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  const weatherIconHtml = `<img src="${weatherIconUrl}" alt="${description}" />`;

  let forecastHtml = '';
  forecastList.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const { main: { temp }, weather: [ { description, icon } ] } = forecast;

    const forecastIconUrl = `https://openweathermap.org/img/w/${icon}.png`;
    const forecastIconHtml = `<img src="${forecastIconUrl}" alt="${description}" />`;

    forecastHtml += `
      <div class="forecast">
        <p>${date.toLocaleDateString()}</p>
        <p>${forecastIconHtml}</p>
        <p>Temperature: ${temp}°F</p>
        <p>Description: ${description}</p>
      </div>
    `;
  });

  const currentWeatherHtml = `
    <h2>${name}</h2>
    <p>${weatherIconHtml}</p>
    <p>Temperature: ${temp}°F</p>
    <p>Humidity: ${humidity}%</p>
    <p>Description: ${description}</p>
  `;

  weatherInfo.innerHTML = `
    ${currentWeatherHtml}
    <div class="forecast-list">
      <h3 style = "font-weight: bold;">5-Day Forecast</h3>
      ${forecastHtml}
    </div>
  `;
}
