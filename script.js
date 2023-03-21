const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const cityName = input.value;
  getWeatherData(cityName);
});
function getWeatherData(cityName) {
  const apiKey = 'ea081e7c8189b40b973d3d4c71f263d0';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Update the current weather section with the received data
      const city = data.name;
      const date = new Date(data.dt * 1000).toLocaleDateString();
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      const temp = Math.round(data.main.temp);
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      currentWeather.innerHTML = `
        <h2>${city} (${date}) <img src="${icon}" alt="${data.weather[0].description}" /></h2>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${wind} m/s</p>
      `;
      
      // Fetch 5-day forecast data using the city's coordinates
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`;
      
      return fetch(forecastUrl);
    })
    .then(response => response.json())
    .then(data => {
      // Update the 5-day forecast section with the received data
      forecast.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const date = new Date(data.daily[i].dt * 1000).toLocaleDateString();
        const icon = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`;
        const temp = Math.round(data.daily[i].temp.day);
        const wind = data.daily[i].wind_speed;
        const humidity = data.daily[i].humidity;
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
          <p>${date} <img src="${icon}" alt="${data.daily[i].weather[0].description}" /></p>
          <p>Temp: ${temp} °C</p>
          <p>Wind: ${wind} m/s</p>
          <p>Humidity: ${humidity}%</p>
        `;
        forecast.appendChild(forecastItem);
      }
      
      // Store the searched city in the search history section
      const li = document.createElement('li');
      li.textContent = cityName;
      searchHistory.appendChild(li);
    })
    .catch(error => console.error(error));
}
